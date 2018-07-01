import * as React from 'react';
import { Rating } from 'semantic-ui-react'
import { theMovieDb } from '../../api';
import { Movie } from '.';
import { Link } from 'react-router-dom';
import { URL_IMG, IMG_PROFILE_SIZE_SMALL, URL_YOUTUBE } from '../../consts';
import { ratingsAPI } from '../../api/ratingApi';

interface Props {
    history: any;
    location: any;
    match: any;
}

interface State {
    movie: any;
    rating: number;
    casts: any[];
    trailers: any[];
}

export class MovieInfo extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            movie: {},
            rating: 0,
            casts: [],
            trailers: [],
        }
    }

    componentDidMount() {
        this.getMovie();
        this.getCastList();
        this.getTrailers();
    }

    private getMovie = () => {
        var self = this
        let id = this.props.match.params.id;
        theMovieDb.movies.getById({ "id": id },
            function (movie) {
                movie = JSON.parse(movie)
                if (movie) {
                    self.setState({ movie })
                }
            },
            function (error) {
                // do something with errorCallback
                console.error(error);
            })
    }

    private getCastList = () => {
        var self = this
        let id = this.props.match.params.id;
        theMovieDb.movies.getCredits({ "id": id },
            function (credits) {
                credits = JSON.parse(credits)
                if (credits && credits.cast) {
                    self.setState({ casts: credits.cast.splice(0, 8) })
                }
            },
            function (error) {
                // do something with errorCallback
                console.error(error);
            })
    }

    private getTrailers = () => {
        var self = this
        let id = this.props.match.params.id;
        theMovieDb.movies.getVideos({ "id": id },
            function (videos) {
                videos = JSON.parse(videos)
                if (videos && videos.results) {
                    let trailers = videos.results.filter(video => video.site === 'YouTube').splice(0, 2);
                    self.setState({ trailers })
                }
            },
            function (error) {
                // do something with errorCallback
                console.error(error);
            })
    }

    private onRate = (e, { rating }) => {
        console.log(e);
        this.setState({ rating });
        let userId = sessionStorage.getItem('userId');
        if (userId) {
            let r = {
                rating,
                userId,
                movieId: this.state.movie.id,
            }
            ratingsAPI.saveRating(r)
                .then(res => {
                    this.setState({ rating: res.rating });
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else
            this.props.history.push('/login');
    }
    render() {
        let movie = this.state.movie;
        return (
            movie ?
                <div className="container-fluid movie-info">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-4 poster">
                            <Movie movie={movie} showTitle={false} />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-8 description">
                            <h1 className="title">{movie.title}</h1>
                            <div>
                                <h4>{movie.vote_average} <i className="fa fa-star" style={{ color: 'yellow' }}></i></h4>
                                Give rating: <Rating maxRating={10} rating={this.state.rating} onRate={this.onRate} icon='star' size='huge' />
                                <h4>{movie.release_date}</h4>
                                <p>{movie.overview}</p>
                            </div>
                            <hr />
                            <Trailers trailers={this.state.trailers} />
                            <hr />
                            <Casts casts={this.state.casts} />
                        </div>
                    </div>
                </div>
                : <div>No Info for that movie</div>
        );
    }
}

const Trailers = (props) => {
    return (
        <div className="container-fluid">
            <h3>Trailers</h3>
            <div className="trailers">
                {
                    props.trailers.map(trailer =>
                        <div key={trailer.key} className="trailer col-xs-12 col-sm-6">
                            <iframe src={URL_YOUTUBE + trailer.key + '?autoplay=1'} allowFullScreen />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

const Casts = (props) => {
    return (
        <div className="container-fluid">
            <h2>Cast List</h2>
            <ul className="row">
                {
                    props.casts.map(cast =>
                        <li key={cast.id} className="star-item col-xs-6 col-sm-3 col-lg-3">
                            <Link to={`/star/${cast.id}`} >
                                <img className="thumbnail" src={URL_IMG + IMG_PROFILE_SIZE_SMALL + cast.profile_path} alt={cast.name} />
                                <span className="name">
                                    <p>{cast.name} As
                                                    <span className="star-name"> {cast.character}</span>
                                    </p>
                                </span>
                            </Link>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}