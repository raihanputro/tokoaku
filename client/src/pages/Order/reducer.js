import { produce } from "immer";

import { SET_TRANSACTION_LIST_DATA } from "./constants";

export const initialState = {
    transactionList: []
};

export const storedKey = [''];

const orderReducer = ( state = initialState, action ) => 
    produce(state, (draft) => {
        switch(action.type) {
            case SET_TRANSACTION_LIST_DATA:
                draft.transactionList = action.transactionListData;
                break;
        }
    });

export default orderReducer;