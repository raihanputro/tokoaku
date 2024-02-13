import { produce } from "immer";

import { SET_USER_LOGIN, SET_USER_INFO_LOGIN } from "./constants";

export const initialState = {
    userData: {},
    infoLoginData: {}
};

export const storedKey = ['userData'];

const loginReducer = ( state = initialState, action ) => 
    produce(state, (draft) => {
        switch(action.type) {
            case SET_USER_LOGIN:
                draft.userData = action.userData;
                break;
            case SET_USER_INFO_LOGIN:
                draft.infoLoginData = action.infoLoginData;
                break;
        }
    });

export default loginReducer;