import { SET_USER_LOGIN, SET_USER_INFO_LOGIN } from "./constants"; 

export const setUserLogin = (userData, cb) => ({
    type: SET_USER_LOGIN,
    userData,
    cb
});

export const setUserInfoLogin = (infoLoginData) => ({
    type: SET_USER_INFO_LOGIN,
    infoLoginData
});