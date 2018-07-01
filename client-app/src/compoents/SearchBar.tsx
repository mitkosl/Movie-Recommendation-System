import * as React from 'react';
import { theMovieDb } from '../api';
const Autosuggest = require('react-autosuggest');
import { URL_IMG, IMG_SIZE_LARGE } from '../consts';
import logoUrl from './../assets/images/themoviedb-small.png';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

interface Props {
    history: any;
    location: any;
    match: any;
}

interface State {
    value: any;
    suggestions: any[];
}

export class SearchBar extends React.Component<Props, State> {
    constructor(props, context) {
        super(props);
        context.router;
        this.state = {
            value: '',
            suggestions: []
        };
    }

    private onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };

    private handleKeyDown = (event) => {
        if (event.key == 'Enter') {
            return this.handleSubmit(this.state.value);
        }
        else return;
    }

    private handleSubmit = (searchText) => {
        this.setState({ value: '' });
        this.props.history.push('/search/' + searchText);
        // return (<Redirect to={'/search/' + searchText} />);
        //this.context.router.transitionTo('/search/' + searchText);
    }


    private getSuggestionValue = (suggestion) => {
        return suggestion.title;
    };

    private onSuggestionsFetchRequested = ({ value }) => {
        const trimmedValue = encodeURIComponent(value.trim());

        theMovieDb.search.getMovie({ "query": trimmedValue },
            (movies) => {
                movies = JSON.parse(movies)
                if (movies.results && movies.results.length > 0) {
                    this.setState({
                        suggestions: movies.results
                    })
                }
            },
            (error) => {
                // do something with errorCallback
                console.error(error);
            })
    }

    private onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    private renderSuggestion = (suggestion) => {
        return (
            <Link to={`/movie/${suggestion.id}`} >
                <img className="searchResult-image" src={suggestion.poster_path == null ? logoUrl : URL_IMG + IMG_SIZE_LARGE + suggestion.poster_path} />
                <div className="searchResult-text">
                    <div className="searchResult-name">
                        {suggestion.title}
                    </div>
                    {suggestion.release_date.substring(0, 4)}
                </div>
            </Link>
        );
    };

    render() {
        // const brandStyle = {
        //     fontWeight: 'bold',
        //     textTransform: 'caplitalize',
        //     paddingLeft: 10,
        //     fontSize: '1.2em'
        // };

        // const imgStyle = {
        //     height: '200%',
        //     width: 'auto',
        //     paddingLeft: '10px',
        //     marginTop: '-8px',
        //     display: 'inline-block'
        // };

        const { value, suggestions } = this.state;
        const inputProps = {
            value,
            onChange: this.onChange,
            onKeyPress: this.handleKeyDown,
            placeholder: 'Search Movie Title...'
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps} />

        );

    }
}

export const SearchBarWithRouter = withRouter(SearchBar);