import { produce } from "immer";

import { SET_USER_PROFILE } from "./constants";

export const initialState = {
    userData: {},
};

export const storedKey = ['userData'];

const profileReducer = ( state = initialState, action ) =>
    produce( state, (draft) => {
        switch(action.type) {
            case SET_USER_PROFILE:
                draft.userData = action.userData;
                break;
        };
    });

export default profileReducer;