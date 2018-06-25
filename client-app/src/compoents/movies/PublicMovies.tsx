import * as React from 'react';
import { MovieContainer } from '.';

export class PublicMovies extends React.Component {
    public render() {
        return (
            <div className="public-movies">
                <MovieContainer />
            </div>
        );
    }
}