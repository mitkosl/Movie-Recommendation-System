import * as React from 'react';
import { userAPI } from '../api';

interface Props {
    history: any;
    location: any;
    match: any;
}

interface State {
    profile: any;
}

export class Profile extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
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
                    userAPI.getUserProfile(userId)
                        .then(res => {
                            this.setState({ profile: { ...res, ...user } });
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

    render() {
        let profile = this.state.profile;
        return (
            <div className="container">
                <div className="panel panel-default jumbotron">
                    <div className="panel-heading">  <h4 >User Profile</h4></div>
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
                                    <h4>{profile.name} </h4>
                                    <span><p>{profile.user}</p></span>
                                </div>
                                <div className="clearfix"></div>

                                <div className="col-sm-5 col-xs-6 tital " >Email:</div><div className="col-sm-7 profile-value"> {profile.email}</div>
                                <div className="clearfix"></div>
                                <div className="bot-border"></div>

                                <div className="col-sm-5 col-xs-6 tital " >Gender:</div><div className="col-sm-7 col-xs-6 profile-value">{profile.gender ? 'Male' : 'Female'}</div>
                                <div className="clearfix"></div>
                                <div className="bot-border"></div>

                                <div className="col-sm-5 col-xs-6 tital " >Date Of Birth:</div><div className="col-sm-7 profile-value">{new Date(profile.date).toLocaleDateString()}</div>

                                <div className="clearfix"></div>
                                <div className="bot-border"></div>

                                <div className="col-sm-5 col-xs-6 tital " >City:</div><div className="col-sm-7 profile-value">{profile.city}</div>

                                <div className="clearfix"></div>
                                <div className="bot-border"></div>

                                <div className="col-sm-5 col-xs-6 tital " >Phone:</div><div className="col-sm-7 profile-value">{profile.phone}</div>

                            </div>
                        </div>
                        {/* <button type="button" className="btn btn-primary  login-button">Edit</button> */}

                    </div>
                </div>
            </div>
        );
    }
}

// const Trailers = (props) => {
//     return (
//         <div className="container-fluid">
//             <h3>Trailers</h3>
//             <div className="trailers">

//             </div>
//         </div>
//     )
// }