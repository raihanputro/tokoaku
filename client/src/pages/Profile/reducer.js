import { produce } from "immer";

import { SET_STEP_PROFILE, SET_USER_PROFILE } from "./constants";

export const initialState = {
    step: '1',
    userData: {},
};

export const storedKey = ['step', 'userData'];

const profileReducer = ( state = initialState, action ) =>
    produce( state, (draft) => {
        switch(action.type) {
            case SET_STEP_PROFILE: 
                draft.step = action.step;
                break;
            case SET_USER_PROFILE:
                draft.userData = action.userData;
                break;
        };
    });

export default profileReducer;