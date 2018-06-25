import * as React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '.';

interface Props {
    movies: any;
}

export default class MovieList extends React.Component<Props> {

    render() {
        let movies = this.props.movies
            .filter(movie => movie.poster_path != null)
            .map(movie =>
                <div className="col-xs-12 col-sm-6 col-md-4 col-xl-3" key={movie.id}>
                    <Link to={`/movie/${movie.id}`} >
                        <Movie movie={movie} showTitle={true} />
                    </Link>
                </div>
            );

        return (
            <div className="movies-container">
                <div className="container-fluid">
                    <div className="row">
                        {movies}
                    </div>
                </div>
            </div>
        );
    }
}