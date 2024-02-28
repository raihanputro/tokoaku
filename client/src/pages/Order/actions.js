import { SET_TRANSACTION_LIST_DATA, GET_TRANSACTION_DATA } from "./constants";

export const setTransactionListData = (transactionListData) => ({
    type: SET_TRANSACTION_LIST_DATA,
    transactionListData
});

export const getTransactionData = () => ({
    type: GET_TRANSACTION_DATA,
});
