import { produce } from "immer";

import { SET_TRANSACTION_DETAIL_DATA, SET_REVIEW_DATA_BY_TR } from "./constants";

export const initialState = {
    transactionDetail: [],
    review: {}
};

export const storedKey = [''];

const transactionDetailReducer = ( state = initialState, action ) => 
    produce(state, (draft) => {
        switch(action.type) {
            case SET_TRANSACTION_DETAIL_DATA:
                draft.transactionDetail = action.transactionDetailData;
                break;
            case SET_REVIEW_DATA_BY_TR:
                draft.review = action.reviewData;
                break;
        }
    });

export default transactionDetailReducer;