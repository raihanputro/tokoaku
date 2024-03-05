import { produce } from "immer";

import { SET_TRANSACTION_DATA, SET_TRANSACTION_DETAIL_DATA } from "./constants";

export const initialState = {
    transactionsData: [],
    transactionDetailData: []
};

export const storedKey = [''];

const transactionDataReducer = ( state = initialState, action ) => 
    produce(state, (draft) => {
        switch(action.type) {
            case SET_TRANSACTION_DATA:
                draft.transactionsData = action.transactionData;
                break;
            case SET_TRANSACTION_DETAIL_DATA:
                draft.transactionDetailData = action.transactionDetailData;
                break;
        }
    });

export default transactionDataReducer;