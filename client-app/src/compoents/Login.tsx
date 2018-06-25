import * as React from 'react';
import { Redirect } from 'react-router';
// import { logInAPI } from '../api';
import { Link } from 'react-router-dom';
import { loginHelpers } from '../api/login/loginHelper';
import { theMovieDb } from '../api';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { logInAPI } from 'src/api/login';

interface Props {
    history: any;
    location: any;
    match: any;
}

interface State {
    redirectToReferrer: boolean;
    modal: boolean;
}

export class Login extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.username = null;
        this.password = null;
        this.state = {
            redirectToReferrer: false,
            modal: false,
        }
    }

    private username;
    private password;

    componentDidMount() {
        //this.getSessionId();
    }


    toggleModal = () => {
        if (this.state.modal) {
            this.getSessionId();
        }
        this.setState({
            modal: !this.state.modal
        });
    }



    private getSessionId = () => {
        let requestToken = sessionStorage.getItem('request_token');
        console.log(requestToken);

        if (requestToken) {
            theMovieDb.authentication.generateSession({ 'request_token': requestToken },
                (sessionId) => {
                    sessionId = JSON.parse(sessionId)
                    if (sessionId && sessionId.success) {
                        sessionStorage.setItem('session_id', sessionId.session_id);
                        sessionStorage.removeItem('request_token');
                        this.setState({ redirectToReferrer: true });
                    }
                },
                (error) => {
                    // do something with errorCallback
                    console.error(error);
                });
        }
    }


    private login = (e) => {
        e.preventDefault();
        const loginUser: any = {
            username: this.username.value,
            password: this.password.value,
        }
        logInAPI.logIn(loginUser)
            .then((res: any) => {
                loginHelpers.setUserToken(res.id);
                sessionStorage.setItem('userId', res.userId);
                this.setState({ redirectToReferrer: true });
            })
            .catch((err) => {
                console.log(err);
            })


        // theMovieDb.authentication.generateToken(
        //     (requestToken) => {
        //         requestToken = JSON.parse(requestToken)
        //         if (requestToken && requestToken.success) {
        //             sessionStorage.setItem('request_token', requestToken.request_token);
        //             loginUser.request_token = requestToken.request_token;

        //             console.log(loginUser);
        //             theMovieDb.authentication.validateUser(loginUser,
        //                 (response) => {
        //                     response = JSON.parse(response);
        //                     if (response.success)
        //                         theMovieDb.authentication.askPermissions({ "token": requestToken.request_token, "redirect_to": "http://localhost:8080/login" });
        //                     console.log(response)
        //                 },
        //                 (error) => {
        //                     console.log(error);
        //                 });
        //         }
        //         //this.toggleModal();


        //         //theMovieDb.authentication.askPermissions({ "token": requestToken.request_token, "redirect_to": "http://localhost:8080/login" });
        //         //window.open('', '_self', ''); window.close();
        //     },
        //     (error) => {
        //         // do something with errorCallback
        //         console.error(error);
        //     });

    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const isLogged = loginHelpers.loggedIn();

        if (this.state.redirectToReferrer === true || isLogged) {
            return <Redirect to={from} {...this.props} />
        }

        let requestToken = sessionStorage.getItem('request_token');

        return (
            <div>
                <div className="login-form">
                    <h3>Login</h3>
                    <form onSubmit={this.login}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" ref={(user) => { this.username = user }} className="form-control" id="username" placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" ref={(pass) => { this.password = pass }} placeholder="Password" />
                            <small id="passwordHelp" className="form-text text-muted">We'll never share your password with anyone else.</small>
                        </div>
                        <Link style={{ fontSize: '1.2em' }} to="/register">Register</Link>
                        <button type="submit" className="btn btn-primary  login-button">Login</button>
                    </form>
                </div>
                {this.state.modal && requestToken ?
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Authorize Account</ModalHeader>
                        <ModalBody>
                            <iframe src={`https://www.themoviedb.org/authenticate/${requestToken}?&output=embed`}></iframe>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggleModal}>Close</Button>
                        </ModalFooter>
                    </Modal> : null
                }
            </div>
        )
    }
}
