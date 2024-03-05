import { produce } from "immer";

import { SET_USERS_DATA, SET_USER_DATA_DETAIL } from "./constants";

export const initialState = {
    users: [],
    userDataDetail: {}
};

export const storedKey = [''];

const userDataReducer = ( state = initialState, action ) => 
    produce(state, (draft) => {
        switch(action.type) {
            case SET_USERS_DATA:
                draft.users = action.usersData;
                break;
            case SET_USER_DATA_DETAIL:
                draft.userDataDetail = action.userData;
                break;
        }
    });

export default userDataReducer;