import { SET_USER_PROFILE, SET_STEP_PROFILE, GET_USER_PROFILE, UPDATE_USER_PROFILE, CHANGE_PASS_PROFILE  } from "./constants";

export const setStepProfile = (step) => ({
    type: SET_STEP_PROFILE,
    step
})

export const setUserProfile = (userData) => ({
    type: SET_USER_PROFILE,
    userData
});

export const getUserProfile = () => ({
    type: GET_USER_PROFILE,
});

export const updateUserProfile = (profileData, cbSuccess, cbFailed) => ({
    type: UPDATE_USER_PROFILE,
    profileData,
    cbSuccess,
    cbFailed
});

export const changePasswordProfile = (changePassData, cbSuccess, cbFailed) => ({
    type: CHANGE_PASS_PROFILE,
    changePassData,
    cbSuccess,
    cbFailed
});