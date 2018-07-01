import * as React from 'react';
import { theMovieDb } from '../../api';
import { withRouter } from 'react-router';
import MovieList from './MovieList';

interface Props {
    history: any;
    location: any;
    match: any;
}

interface State {
    movies: any;
    title: string;
}

export class MovieContainer extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            title: "Most popular Movies",
        }
    }

    private getPopularMovies = () => {
        theMovieDb.movies.getPopular({},
            (movies) => {
                movies = JSON.parse(movies)
                if (movies.results && movies.results.length > 0) {
                    this.setState({
                        movies: movies.results,
                        title: "Most popular Movies",
                    })
                }
            },
            (error) => {
                // do something with errorCallback
                console.error(error);
            })
    }

    private getMovies = (searchQuery) => {
        theMovieDb.search.getMovie({ "query": encodeURIComponent(searchQuery) },
            (movies) => {
                movies = JSON.parse(movies)
                if (movies.results && movies.results.length > 0) {
                    this.setState({
                        movies: movies.results,
                        title: "Movies for search: " + searchQuery,
                    })
                }
            },
            (error) => {
                // do something with errorCallback
                console.error(error);
            })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            if (nextProps.match && nextProps.match.params && nextProps.match.params.searchQuery)
                this.getMovies(nextProps.match.params.searchQuery);
        }
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.searchQuery)
            this.getMovies(this.props.match.params.searchQuery);
        else
            this.getPopularMovies();
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                {this.state.movies ?
                    <MovieList movies={this.state.movies} /> : <div>No movies to Display</div>
                }
            </div>
        );
    }
}

export const MovieContainerWithRouter = withRouter(MovieContainer);