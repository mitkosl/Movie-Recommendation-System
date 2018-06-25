import * as React from 'react';
import { theMovieDb } from '../../api';
import MovieList from './MovieList';

interface State {
    movies: any;
}

export class MovieContainer extends React.Component<{}, State> {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
        }
    }

    private getPopularMovies = () => {
        var self = this

        theMovieDb.movies.getPopular({},
            function (movies) {
                movies = JSON.parse(movies)
                if (movies.results && movies.results.length > 0) {
                    self.setState({
                        movies: movies.results
                    })
                }
            },
            function (error) {
                // do something with errorCallback
                console.error(error);
            })
    }


    componentDidMount() {
        this.getPopularMovies();
    }

    render() {
        return (
            <div>
                {this.state.movies ?
                    <MovieList movies={this.state.movies} /> : <div>No movies to Display</div>
                }
            </div>
        );
    }
}