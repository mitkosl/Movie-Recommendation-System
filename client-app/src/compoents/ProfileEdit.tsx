import * as React from 'react';
import { userAPI } from '../api';
import { Calendar } from 'primereact/components/calendar/Calendar';
import { withRouter } from 'react-router';

interface Props {
    history: any;
    location: any;
    match: any;
}

interface State {
    profile: any;
    name: string;
    gender: boolean;
    birthdate: Date;
    city: string;
    phone: string;
}

export class ProfileEdit extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            name: "",
            gender: true,
            birthdate: new Date(),
            city: "",
            phone: "",
        }
    }

    componentDidMount() {
        this.getUser();
    }

    private getUser = () => {
        let userId = sessionStorage.getItem('userId');
        if (userId) {
            userAPI.getUser(userId)
                .then(res => {
                    var user = res;
                    console.log(res);
                    userAPI.getUserProfile(userId)
                        .then(res => {
                            console.log(res);
                            this.setState({
                                profile: { ...user, ...res },
                                name: res.name,
                                gender: res.gender,
                                birthdate: new Date(res.birthdate),
                                city: res.city,
                                phone: res.phone
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    handleChange = (event) => {
        let newState = { ...this.state, [event.target.name]: event.target.value }
        this.setState(newState);
    }

    onGenderChange = (e) => {
        this.setState({
            gender: e.currentTarget.value == "male"
        });
    }

    onSave = () => {
        let profile = {
            userId: this.state.profile.userId,
            id: this.state.profile.id,
            name: this.state.name,
            gender: this.state.gender,
            birthdate: this.state.birthdate,
            city: this.state.city,
            phone: this.state.phone,
        }
        userAPI.registerUserProfile(profile)
            .then(res => {
                if (res) {
                    this.props.history.push('/profile')
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default jumbotron">
                    <div className="panel-heading">  <h4 >Edit User Profile</h4></div>
                    <div className="panel-body">
                        <div className="box box-info">
                            <div className="box-body">
                                <div className="col-sm-6">
                                    <div>
                                        <img alt="User Pic" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" id="profile-image1" className="img-circle img-responsive" />
                                    </div>
                                    <br />
                                </div>
                                <div className="col-sm-6">
                                    <span><p>{this.state.profile.user}</p></span>
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-sm-5 col-xs-6 tital " >Name:</div><div className="col-sm-7 profile-value">
                                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                                </div>
                                <div className="clearfix"></div>
                                <div className="bot-border"></div>

                                <div className="col-sm-5 col-xs-6 tital " >Gender:</div><div className="col-sm-7 col-xs-6 profile-value">
                                    <div className="form-check">
                                        <label><input type="radio" name="gender" value="male" checked={this.state.gender == true} onChange={this.onGenderChange} /> Male</label>
                                        <label><input type="radio" name="gender" value="female" checked={this.state.gender == false} onChange={this.onGenderChange} /> Female</label>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="bot-border"></div>

                                <div className="col-sm-5 col-xs-6 tital " >Date Of Birth:</div><div className="col-sm-7 profile-value">
                                    <Calendar dateFormat="dd.mm.yy" showTime={false} showIcon value={this.state.birthdate} onChange={(e) => this.setState({ birthdate: e.value })}></Calendar>
                                </div>

                                <div className="clearfix"></div>
                                <div className="bot-border"></div>

                                <div className="col-sm-5 col-xs-6 tital " >City:</div><div className="col-sm-7 profile-value">
                                    <input type="text" name="city" value={this.state.city} onChange={this.handleChange} />
                                </div>

                                <div className="clearfix"></div>
                                <div className="bot-border"></div>

                                <div className="col-sm-5 col-xs-6 tital " >Phone:</div><div className="col-sm-7 profile-value">
                                    <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange} />
                                </div>

                            </div>
                        </div>
                        <button type="button" className="btn btn-primary save-button" onClick={this.onSave} >Save</button>

                    </div>
                </div>
            </div>
        );
    }
}

export const ProfileEditWithRouter = withRouter(ProfileEdit);

// const Trailers = (props) => {
//     return (
//         <div className="container-fluid">
//             <h3>Trailers</h3>
//             <div className="trailers">

//             </div>
//         </div>
//     )
// }