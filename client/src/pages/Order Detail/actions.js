import { 
    SET_TRANSACTION_DETAIL_DATA,
    SET_REVIEW_DATA_BY_TR,
    GET_TRANSACTION_DETAIL_DATA, 
    GET_REVIEW_DATA_BY_TR,
    UPDATE_TRANSACTION_DETAIL_DATA,
    CREATE_REVIEW_DATA,
    UPDATE_REVIEW_DATA
} from "./constants";

export const setTransactionDetailData = (transactionDetailData) => ({
    type: SET_TRANSACTION_DETAIL_DATA,
    transactionDetailData,
});

export const setReviewDataByTr = (reviewData) => ({
    type: SET_REVIEW_DATA_BY_TR,
    reviewData
});

export const getTransactionDetailData = (id) => ({
    type: GET_TRANSACTION_DETAIL_DATA,
    id
});

export const getReviewDataByTr = (id) => ({
    type: GET_REVIEW_DATA_BY_TR,
    id
});

export const updateTransactionDetailData = (transactionData) => ({
    type: UPDATE_TRANSACTION_DETAIL_DATA,
    transactionData
});

export const createReviewData = (reviewData) => ({
    type: CREATE_REVIEW_DATA,
    reviewData
});

export const updateReviewData = (reviewData) => ({
    type: UPDATE_REVIEW_DATA,
    reviewData
});


