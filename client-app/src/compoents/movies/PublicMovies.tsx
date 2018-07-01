import * as React from 'react';
import { MovieContainer } from '.';

interface Props {
    history: any;
    location: any;
    match: any;
}

export class PublicMovies extends React.Component<Props> {
    public render() {
        return (
            <div className="public-movies">
                <MovieContainer {...this.props} />
            </div>
        );
    }
}