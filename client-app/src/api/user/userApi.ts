import { SERVER_API } from "../../consts";
import { UserProfile, LogInModel } from "../../models";
import axios from 'axios';
import { loginHelpers } from "../login/loginHelper";

const token = loginHelpers.getUserToken();
const registerUserProfileUrl = SERVER_API + '/profiles';
const registerUserUrl = SERVER_API + `/users`;
const gerUserUrl = (id) => SERVER_API + `/users/${id}?access_token=${token}`;
//const gerUserProfileUrl = (userId) => SERVER_API + `/profiles/?filter[where][userId]=${userId}&access_token=${token}&`;
const gerUserProfilesUrl = SERVER_API + `/profiles?access_token=${token}`;

const registerUserProfile = (profile: UserProfile): Promise<any> => {
    return axios.request({
        method: 'post',
        url: registerUserProfileUrl,
        data: JSON.stringify(profile),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res: any) => {
            if (res.statusText != "OK" && !res.date) {
                console.log(res.statusText);
                return Promise.reject(res.status);
            }
            return (res.data)
        })
        .catch((err) => {
            console.log(err);
        });
}

const getUser = (id): Promise<any> => {
    return axios.get(gerUserUrl(id))
        .then((res: any) => {
            if (res.statusText != "OK" && !res.date) {
                console.log(res.statusText);
                return Promise.reject(res.status);
            }
            return (res.data)
        })
        .catch((err) => {
            console.log(err);
        });
}

const getUserProfiles = (): Promise<any[]> => {
    return axios.get(gerUserProfilesUrl)
        .then((res: any) => {
            if (res.statusText != "OK" && !res.date) {
                console.log(res.statusText);
                return Promise.reject(res.status);
            }
            return (res.data)
        })
        .catch((err) => {
            console.log(err);
        });
}
const getUserProfile = (id): Promise<any> => {
    var userId = id;
    return getUserProfiles()
        .then((res: any) => {
            if (res.length <= 0) {
                console.log(res);
                return Promise.reject('No data');
            }
            return (res.filter(f => f.userId == userId)[0])
        })
        .catch((err) => {
            console.log(err);
        });
}

const registerUser = (loginModel: LogInModel): Promise<any> => {
    return axios.request({
        method: 'post',
        url: registerUserUrl,
        data: JSON.stringify(loginModel),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        // return fetch(registerUserUrl(profile.profileId), {
        //     method: "POST",
        //     body: JSON.stringify(profile),
        //     mode: "cors",
        //     cache: "no-cache",
        //     headers: new Headers({
        //         'Accept': '*',
        //         "Content-Type": "application/json",
        //     }),
        // })
        .then((res: any) => {
            if (res.statusText != "OK" && !res.date) {
                console.log(res.statusText);
                return Promise.reject(res.status);
            }
            return (res.data);
        })
        .catch((err) => {
            console.log(err.response);
            return Promise.reject(err.response);
        });
}

export const userAPI = {
    getUser,
    getUserProfile,
    registerUserProfile,
    registerUser,
};


// const baseUrl = 'http://192.168.13.97:2415';
// const getGatewaysUri = () => `${baseUrl}/api/gateways`;
// const getGatewayUri = (id: number) => `${baseUrl}/api/gateways/${id}`;

// const baseUrl = 'http://192.168.13.97:2415';
// const getGatewaysUri = () => `${baseUrl}/api/Gateways`;
// const getGatewayUri = (id: number) => `${baseUrl}/api/Gateways/${id}`;

// const mapToGateways = (gateways: any[]): GatewayEntity[] => {
//     return gateways.map(mapToGateway);
// };

// const mapToGateway = (e): GatewayEntity => {
//     return {
//         id: e.id,
//         name: e.name,
//         login: e.login,
//         password: e.password,
//         connectionString: e.connectionString,
//     };
// };

// const fetchGateways = (): Promise<GatewayEntity[]> => {
//     var token = loginHelpers.getUserToken();
//     if (token) {
//         return fetch(getGatewaysUri(), {
//             headers: new Headers({
//                 "Authorization": `Bearer ${token}`,
//             }),
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     if (response.status == 401 && response.statusText == "Unauthorized") {
//                         return Promise.reject(loginHelpers.unauthorizedError);
//                     }
//                     alert(response.statusText);
//                 }
//                 return (response.json())
//             })
//             .then(mapToGateways)
//             .catch(err => {console.log(err); return [];});
//     } else {
//         return Promise.reject(loginHelpers.unauthorizedError);
//     }
// }

// const deleteGateway = (id: number): Promise<void> => {
//     var token = loginHelpers.getUserToken();
//     if (token) {
//         return fetch(getGatewayUri(id), {
//             method: "DELETE",
//             headers: new Headers({
//                 "Authorization": `Bearer ${token}`,
//             }),
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     if (response.status == 401 && response.statusText == "Unauthorized") {
//                         return Promise.reject(loginHelpers.unauthorizedError);
//                     }
//                     if (response.status === 404) {
//                         alert("Gateway with id = " + id + " not found");
//                     } else alert(response.statusText);
//                 }
//             })
//             .catch(err => console.log(err));
//     } else {
//         return Promise.reject(loginHelpers.unauthorizedError);
//     }
// };

// const saveGateway = (gateway: GatewayEntity): Promise<GatewayEntity> => {
//     let url: string;
//     let method: string;

//     if (gateway.id) { // should use only POST becauce we can not edit elements...  PUT is left just in case it is needed
//         url = getGatewayUri(gateway.id);
//         method = "PUT";
//     } else {
//         url = getGatewaysUri();
//         method = "POST";
//     }

//     var token = loginHelpers.getUserToken();
//     if (token) {
//         return fetch(url, {
//             method,
//             body: JSON.stringify(gateway),
//             headers: new Headers({
//                 "Authorization": `Bearer ${token}`,
//                 "Content-type": "application/json",
//             }),
//         })
//             .then((res: Response) => {
//                 if (!res.ok) {
//                     if (res.status == 401 && res.statusText == "Unauthorized") {
//                         return Promise.reject(loginHelpers.unauthorizedError);
//                     }
//                     alert(res.statusText);
//                 }
//                 if (res.statusText !== "No Content")
//                     return (res.json())
//                 else
//                     return gateway;
//             })
//             .catch(err => console.log(err));
//     } else {
//         return Promise.reject(loginHelpers.unauthorizedError);
//     }
// };