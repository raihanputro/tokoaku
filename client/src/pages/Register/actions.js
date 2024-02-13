import { SET_USER_REGISTER } from "./constants";

export const setUserRegister = ( userData, cb ) => ({
    type: SET_USER_REGISTER,
    userData, 
    cb
});