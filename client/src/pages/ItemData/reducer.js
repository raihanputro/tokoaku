import { produce } from "immer";

import { SET_ITEM_DATA } from "./constants";

export const initialState = {
    itemDataAdmin: {},
};

export const storedKey = ['itemDataAdmin'];

const itemDataReducer = ( state = initialState, action ) => 
    produce(state, (draft) => {
        switch(action.type) {
            case SET_ITEM_DATA:
                draft.itemDataAdmin = action.itemData;
                break;
        }
    });

export default itemDataReducer;