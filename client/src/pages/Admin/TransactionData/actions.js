import {
    SET_TRANSACTION_DATA,
    SET_TRANSACTION_DETAIL_DATA,
    GET_TRANSACTION_DATA,
    GET_TRANSACTION_DETAIL_DATA,
    UPDATE_TRANSACTION_DATA
} from './constants';

export const setTransactionData = (transactionData) => ({
    type: SET_TRANSACTION_DATA,
    transactionData,
});

export const setTransactionDetailData = (transactionDetailData) => ({
    type: SET_TRANSACTION_DETAIL_DATA,
    transactionDetailData
});

export const getTransactionData = () => ({
    type: GET_TRANSACTION_DATA,
});

export const getTransactionDetailData = (id) => ({
    type: GET_TRANSACTION_DETAIL_DATA,
    id, 
});

export const updateTransactionData = (id, transactionData) => ({
    type: UPDATE_TRANSACTION_DATA,
    id,
    transactionData
});