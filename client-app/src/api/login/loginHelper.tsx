const getUserToken = () => sessionStorage.getItem('token');
const setUserToken = (token) => sessionStorage.setItem('token', token);
const deleteUserToken = () => sessionStorage.removeItem('token');

const loggedIn = () => {
    const token = getUserToken();
    if (token)
        return true;
    else return false;
}

const unauthorizedError = {
    message: "Your session has expired, please log in again",
}
export const loginHelpers = {
    getUserToken,
    setUserToken,
    deleteUserToken,
    unauthorizedError,
    loggedIn
};