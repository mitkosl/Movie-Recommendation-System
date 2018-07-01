import axios from 'axios';
import { SERVER_API } from "../consts";
import { LogInModel, Rating } from "../models";
import { loginHelpers } from "./login/loginHelper";

const token = loginHelpers.getUserToken();
const ratingsUrl = SERVER_API + '/ratings';
const gerUserUrl = (id) => SERVER_API + `/users/${id}?access_token=${token}`;
//const gerUserProfileUrl = (userId) => SERVER_API + `/profiles/?filter[where][userId]=${userId}&access_token=${token}&`;
// const gerUserProfilesUrl = SERVER_API + `/profiles?access_token=${token}`;

const saveRating = (rating: Rating): Promise<any> => {
    let method: string;
    if (rating.id) { // should use only POST becauce we can not edit elements...  PUT is left just in case it is needed
        method = "PUT";
    } else {
        method = "POST";
    }
    return axios.request({
        method: method,
        url: ratingsUrl,
        data: JSON.stringify(rating),
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


const registerUser = (loginModel: LogInModel): Promise<any> => {
    return axios.request({
        method: 'post',
        url: ratingsUrl,
        data: JSON.stringify(loginModel),
        headers: {
            'Content-Type': 'application/json'
        }
    })
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

export const ratingsAPI = {
    getUser,
    saveRating,
    registerUser,
};