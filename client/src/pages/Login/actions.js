import { SET_USER_LOGIN } from "./constants"; 

export const setUserLogin = (userData, cb) => ({
    type: SET_USER_LOGIN,
    userData,
    cb
});