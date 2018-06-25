import * as React from 'react';
import { theMovieDb } from '../../api';
import { Movie } from '.';
import { Link } from 'react-router-dom';
import { URL_IMG, IMG_PROFILE_SIZE_SMALL } from '../../consts';

interface Props {
    history: any;
    location: any;
    match: any;
}

interface State {
    person: any;
    casts: any[];
}

export class StarInfo extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            person: {},
            casts: [],
        }
    }

    componentDidMount() {
        this.getPerson();
        this.getCastList();
    }

    private getPerson = () => {
        var self = this
        let id = this.props.match.params.id;
        theMovieDb.people.getById({ "id": id },
            function (person) {
                person = JSON.parse(person)
                if (person) {
                    self.setState({ person })
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
        theMovieDb.people.getCredits({ "id": id },
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

    render() {
        let person = this.state.person;
        person.poster_path = person.profile_path;
        return (
            person ?
                <div className="container-fluid star-info">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-4 poster">
                            <Movie movie={person} showTitle={false} />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-8 description">
                            <h1 className="title">{person.name}</h1>
                            <div>
                                <h4>{person.popularity} <i className="fa fa-heart" style={{ color: 'red' }}></i></h4>
                                <h4>{person.place_of_birth}</h4>
                                <h4>{person.birthday}</h4>
                                <p>{person.biography}</p>
                            </div>
                            <hr />
                            <Casts casts={this.state.casts} />
                        </div>
                    </div>
                </div>
                : <div>No Info for that movie</div>
        );
    }
}


const Casts = (props) => {
    return (
        <div className="container-fluid">
            <h2>Cast List</h2>
            <ul className="row">
                {
                    props.casts.map(cast =>
                        <li key={cast.id} className="star-item col-xs-6 col-sm-3 col-lg-3">
                            <Link to={`/movie/${cast.id}`} >
                                <img className="thumbnail" src={URL_IMG + IMG_PROFILE_SIZE_SMALL + cast.poster_path} alt={cast.title} />
                                <span className="name">
                                    <p>"{cast.title}"
                                        As <span className="star-name"> {cast.character}</span>
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