import { LogInModel } from "../../models";
import { SERVER_API } from "../../consts";
import axios from 'axios';

const logInUri = SERVER_API + '/Users/login';


const logIn = (logInModel: LogInModel): Promise<{}> => {
    return axios.request({
        method: 'post',
        url: logInUri,
        data: logInModel
    })
        .then((res: any) => {
            if (res.statusText != "OK" && !res.date) {
                console.log(res.statusText);
                return Promise.reject(res.status);
            }
            return (res.data);
        })
        .catch((err) => {
            console.log(err);
        });
}

export const logInAPI = {
    logIn,
};