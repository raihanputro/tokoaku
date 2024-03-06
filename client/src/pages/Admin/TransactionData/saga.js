import { takeLatest, call, put } from "redux-saga/effects";
import { GET_TRANSACTION_DATA, UPDATE_TRANSACTION_ADMIN_DATA } from "./constants";
import { setTransactionData } from "./actions";
import { getAllTransactionApi, updateTransactionStatusAdminApi } from "@domain/api";
import { setLoading, showPopup } from "@containers/App/actions";

function* doGetTransactionsData () {
    try {
        const res = yield call(getAllTransactionApi);
        yield put(setTransactionData(res.data));
    } catch (error) {
        console.log(error);
    }
};

function* doUpdateTransactionStatusAdmin ({id}) {
    try {
        yield call(updateTransactionStatusAdminApi, id);
        const res = yield call(getAllTransactionApi);
        yield put(setTransactionData(res.data));
    } catch (error) {
        yield put(showPopup(error));
    }
};

export default function* transactionDataSaga() {
    yield takeLatest(GET_TRANSACTION_DATA, doGetTransactionsData);
    yield takeLatest(UPDATE_TRANSACTION_ADMIN_DATA, doUpdateTransactionStatusAdmin);
};