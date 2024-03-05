import { SET_USER_LOGIN } from "./constants"; 

export const setUserLogin = (userData, cbFailed) => ({
    type: SET_USER_LOGIN,
    userData,
    cbFailed
});