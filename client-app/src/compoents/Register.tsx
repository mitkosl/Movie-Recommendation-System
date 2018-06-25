import * as React from 'react';
import { Redirect } from 'react-router';
import { loginHelpers } from '../api/login/loginHelper';
import { UserProfile } from '../models';
import { userAPI } from '../api/user/userApi';
import * as toastr from 'toastr'

interface Props {
    history: any;
    location: any;
    match: any;
}

interface State {
    redirectToLogin: boolean;
}

export class Register extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.username = null;
        this.name = null;
        this.gender = true;
        this.city = null;
        this.phone = null;
        this.password = null;
        this.password2 = null;
        this.birthdate = new Date();
        this.email = null;
        this.state = {
            redirectToLogin: false,
        }
    }

    private username;
    private password;
    private password2;
    private email;

    private name;
    private gender;
    private city;
    private phone;
    private birthdate;

    private onRegister = (e) => {
        e.preventDefault();
        if (this.password.value !== this.password2.value)
            return;

        const loginUser: any = {
            username: this.username.value,
            password: this.password.value,
            email: this.email.value || '',
        }
        const userProfile: UserProfile = {
            name: this.name.value || "",
            gender: this.gender.value == 'male' || true,
            city: this.city.value || "",
            phone: this.phone.value || "",
            birthdate: this.birthdate.value || new Date(),
        }
        this.register(userProfile, loginUser);
    }

    private register = (userProfile, loginUser) => {
        userAPI.registerUser(loginUser)
            .then((res: any) => {
                if (res) {
                    userProfile.userId = res.id;
                    userAPI.registerUserProfile(userProfile)
                        .then((res: any) => {
                            if (res) {
                                this.setState({ redirectToLogin: true });
                            }
                        })
                        .catch((error) => {
                            if (error.status == 422)
                                toastr.error("User already excists");
                            console.log(error);
                        })
                }
            })
            .catch((error) => {
                if (error.status == 422)
                    toastr.error("User already excists");
                console.log(error);
            })
    }


    // private login = (e) => {
    //     e.preventDefault();
    //     const loginUser: any = {
    //         username: this.username.value,
    //         password: this.password.value,
    //     }
    //     logInAPI.logIn(loginUser).then(() => {
    //         loginHelpers.setUserToken('someToken');
    //         this.setState({ redirectToReferrer: true });
    //     });
    // }

    render() {
        const isLogged = loginHelpers.loggedIn();

        if (this.state.redirectToLogin === true || isLogged) {
            return <Redirect to={'/login'} {...this.props} />
        }

        return (
            <div>
                <div className="login-form">
                    <h3>Register</h3>
                    <form onSubmit={this.onRegister}>
                        <div className="form-group">
                            <label htmlFor="username"> Username</label>
                            <input type="text" name="username" className="form-control" ref={(user) => { this.username = user }} placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name"> Name</label>
                            <input type="text" name="name" className="form-control" ref={(name) => { this.name = name }} placeholder="Your name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email"> Email</label>
                            <input type="text" name="email" className="form-control" ref={(mail) => { this.email = mail }} placeholder="email@.abv.bg" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">  Password</label>
                            <input type="password" name="password" className="form-control" ref={(pass) => { this.password = pass }} placeholder="********" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password2">  Repeat the password</label>
                            <input type="password" name="password2" className="form-control" ref={(pass) => { this.password2 = pass }} placeholder="********" />
                        </div>
                        <div className="form-check">
                            <label><input type="radio" className="form-check-input" name="gender" value="male" checked /> Male</label>
                            <br />
                            <label><input type="radio" className="form-check-input" name="gender" value="female" /> Female</label>
                            <br />
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthdate">  Birthdate</label>
                            <input type="text" name="birthdate" className="form-control" ref={(date) => { this.birthdate = date }} placeholder="1994-03-10T05:25:00.903Z" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">  City</label>
                            <input type="text" name="city" className="form-control" ref={(city) => { this.city = city }} placeholder="city name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">  Phone</label>
                            <input type="text" name="phone" className="form-control" ref={(phone) => { this.phone = phone }} placeholder="0883306533" />
                        </div>

                        <input type="submit" value="Register" className="btn btn-primary login-button" />
                        <br />
                        <br />
                    </form>
                </div>
            </div>
        )
    }
}
