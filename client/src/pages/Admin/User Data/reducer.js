import { produce } from "immer";

import { SET_USER_DATA, SET_USER_DATA_DETAIL } from "./constants";

export const initialState = {
    userDataAdmin: {},
    userDataDetail: {}
};

export const storedKey = ['userDataAdmin'];

const userDataReducer = ( state = initialState, action ) => 
    produce(state, (draft) => {
        switch(action.type) {
            case SET_USER_DATA:
                draft.userDataAdmin = action.userData;
                break;
            case SET_USER_DATA_DETAIL:
                draft.userDataDetail = action.userData;
                break;
        }
    });

export default userDataReducer;