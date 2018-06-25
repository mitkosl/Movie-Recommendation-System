
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { PublicMovies, Login, About, MovieContainer, Register, StarInfo } from '.';
import { MovieInfo } from 'src/compoents/movies';
import { loginHelpers } from 'src/api/login/loginHelper';
import { Profile } from './Profile';
import { Link } from 'react-router-dom';

const loggedIn = () => {
    const token = loginHelpers.getUserToken();
    if (token)
        return true;
    else return false;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        loggedIn() === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )} />
)

const PublicRouteOnly = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        loggedIn() === false
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }} />
    )} />
)

export const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" render={() => (
                loggedIn() ? (<Redirect to="/movies" />) :
                    (<PublicMovies />)
            )} />
            <Route exact path='/movies' component={MovieContainer} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/logout' component={Logout} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <Route exact path='/about' component={About} />
            <PublicRouteOnly exact path='/register' component={Register} />
            <Route exact path='/movie/:id' component={MovieInfo} />
            <Route exact path='/star/:id' component={StarInfo} />
            <Route exact path='*' component={MissingRoute} />
        </Switch>
    </main>
);

const Logout = () => {
    loginHelpers.deleteUserToken();
    return (
        <Redirect to="/" />
    );
}

const MissingRoute = () => (
    <div className="error-wrapper">
        <div className="error-container">
            <div className="error">
                <div className="error-title">
                    Error
            </div>
                <div className="error-number">
                    404
            </div>
                <div className="error-description">
                    Sorry, The page you were looking for doesn't exist
            </div>
                <Link to="/">Back to Home</Link>
            </div>
        </div>
    </div>
);