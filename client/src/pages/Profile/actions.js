import { SET_USER_PROFILE, GET_USER_PROFILE } from "./constants";

export const setUserProfile = (userData) => ({
    type: SET_USER_PROFILE,
    userData
});

export const getUserProfile = () => ({
    type: GET_USER_PROFILE,
})