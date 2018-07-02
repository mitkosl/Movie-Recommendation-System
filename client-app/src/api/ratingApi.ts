import axios from 'axios';
import { SERVER_API } from "../consts";
import { loginHelpers } from "./login/loginHelper";
import { Rating } from '../models';

const token = loginHelpers.getUserToken();
const ratingsUrl = SERVER_API + '/ratings';
// {where: {and: [{movieId: 'My Post'}, {userId: 'Hello'}]}}
const gerUserUrl = (movieId, userId) => SERVER_API + `/ratings/?filter[where][movieId]=${movieId}&access_token=${token}` //&filter[where][and][1][userId]=${userId};
//const gerUserProfileUrl = (userId) => SERVER_API + `/profiles/?filter[where][userId]=${userId}&access_token=${token}&`;
// const gerUserProfilesUrl = SERVER_API + `/profiles?access_token=${token}`;

const saveRating = (rating: Rating): Promise<any> => {
    let method: string;
    if (rating.id) {
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

const getRating = (movieId, userId): Promise<any> => {
    return axios.get(gerUserUrl(movieId, userId))
        .then((res: any) => {
            if (res.statusText != "OK" && !res.data) {
                console.log(res.statusText);
                return Promise.reject(res.status);
            }
            return (res.data.filter(rat => rat.userId == userId))[0];
        })
        .catch((err) => {
            console.log(err);
        });
}


export const ratingsAPI = {
    getRating,
    saveRating,
};