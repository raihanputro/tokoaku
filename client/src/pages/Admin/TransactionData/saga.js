import { takeLatest, call, put } from "redux-saga/effects";
import { GET_TRANSACTION_DATA } from "./constants";
import { setTransactionData } from "./actions";
import { getAllTransactionApi } from "@domain/api";
import { setLoading, showPopup } from "@containers/App/actions";

function* doGetTransactionsData () {
    try {
        const res = yield call(getAllTransactionApi);
        yield put(setTransactionData(res.data));
    } catch (error) {
        console.log(error);
    }
};

export default function* transactionDataSaga() {
    yield takeLatest(GET_TRANSACTION_DATA, doGetTransactionsData);
};