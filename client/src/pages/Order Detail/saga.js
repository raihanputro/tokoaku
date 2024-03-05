import { takeLatest, call, put } from "redux-saga/effects";
import { GET_TRANSACTION_DETAIL_DATA, UPDATE_TRANSACTION_DETAIL_DATA, GET_REVIEW_DATA_BY_TR, CREATE_REVIEW_DATA, UPDATE_REVIEW_DATA } from "./constants";
import { getTransactionDetailApi, updateTransactionStatusApi, getReviewByTrApi, addReviewApi, updateReviewApi } from "@domain/api";
import { setTransactionDetailData, setReviewDataByTr } from "./actions";
import { setLoading, showPopup } from "@containers/App/actions";

function* doGetTransactionDetailData ({ id }) {
    try {
        const res = yield call(getTransactionDetailApi, id);
        yield put(setTransactionDetailData(res.data));
    } catch (error) {
        yield put(showPopup(error));
    }
};

function* doUpdateTransactionDetailData ({transactionData}) {
    try {
        yield call(updateTransactionStatusApi, transactionData);
        const res = yield call(getTransactionDetailApi, id);
        yield put(setTransactionDetailData(res.data));
    } catch (error) {
        yield put(showPopup(error));
    }
};

function* doGetReviewData ({ id }) {
    try {
        const res = yield call(getReviewByTrApi, id);
        yield put(setReviewDataByTr(res.data));
    } catch (error) {
        yield put(showPopup(error));
    }
}

function* doPostReviewData ({ reviewData }) {
    try {
        yield call(addReviewApi, reviewData);
    } catch (error) {
        console.log(error, 'ini error');
    }
};

function* doUpdateReviewData ({ reviewData }) {
    try {
        yield call(updateReviewApi, reviewData);
    } catch (error) {
        console.log(error, 'ini error');
    }
};

export default function* transactionDetailSaga() {
    yield takeLatest(GET_TRANSACTION_DETAIL_DATA, doGetTransactionDetailData);
    yield takeLatest(UPDATE_TRANSACTION_DETAIL_DATA, doUpdateTransactionDetailData);
    yield takeLatest(GET_REVIEW_DATA_BY_TR, doGetReviewData);
    yield takeLatest(CREATE_REVIEW_DATA, doPostReviewData);
    yield takeLatest(UPDATE_REVIEW_DATA, doUpdateReviewData);
};