import * as React from 'react';
import { URL_IMG, IMG_SIZE_LARGE } from '../../consts';

interface Props {
    movie: any;
    showTitle?: boolean;
}

export class Movie extends React.Component<Props, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        const movie = this.props.movie;
        return (
            <div className="movie-poster">
                <img className="movie-poster-image" src={URL_IMG + IMG_SIZE_LARGE + movie.poster_path} alt={movie.title} />
                {
                    this.props.showTitle ? <div className="movie-poster-title">
                        <h3>{movie.title}</h3>
                        {movie.vote_average} <i className="fa fa-star" style={{ color: 'yellow' }}></i>  &nbsp;&nbsp; {movie.release_date.substring(0, 4)}
                    </div> : null
                }
            </div>
        );
    }
}