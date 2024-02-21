import { produce } from "immer";

import { SET_CATEGORY_DATA, SET_CATEGORY_DETAIL_DATA } from "./constants";

export const initialState = {
    categoryData: [],
    categoryDetailData: []
};

export const storedKey = ['categoryData'];

const categoryDataReducer = ( state = initialState, action ) => 
    produce(state, (draft) => {
        switch(action.type) {
            case SET_CATEGORY_DATA:
                draft.categoryData = action.categoryData;
                break;
            case SET_CATEGORY_DETAIL_DATA:
                draft.categoryDetailData = action.categoryDetailData;
                break;
        }
    });

export default categoryDataReducer;