import { SET_USERS_DATA, SET_USER_DATA_DETAIL, GET_USERS_DATA, GET_DETAIL_USER_DATA, UPDATE_USER_DATA, DELETE_USER_DATA } from "./constants"; 

export const setUserData = (usersData) => ({
    type: SET_USERS_DATA,
    usersData,
});

export const setUserDataDetail = (userData) => ({
    type: SET_USER_DATA_DETAIL,
    userData
})

export const getuserData = () => ({
    type: GET_USERS_DATA,
});

export const getUserDataDetail = (id) => ({
    type: GET_DETAIL_USER_DATA,
    id
})

export const updateUserData = (id, userData) => ({
    type: UPDATE_USER_DATA,
    id,
    userData
});

export const deleteUserData = (id) => ({
    type: DELETE_USER_DATA,
    id
})