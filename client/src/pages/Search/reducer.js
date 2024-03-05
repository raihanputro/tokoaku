import { produce } from "immer";

import { SET_ITEM_SEACH } from "./constants";

export const initialState = {
    itemSearch: [],
};

export const storedKey = [''];

const searchReducer = ( state = initialState, action ) => 
    produce(state, (draft) => {
        switch(action.type) {
            case SET_ITEM_SEACH:
                draft.itemSearch = action.itemSearchData;
                break;
        }
    });

export default searchReducer;