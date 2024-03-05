import { takeLatest, call, put } from "redux-saga/effects";
import { GET_TRANSACTION_DATA} from "./constants";
import { getTransactionByUserApi } from "@domain/api";
import { setTransactionListData } from "./actions";
import { setLoading, showPopup } from "@containers/App/actions";

function* doGetTransactionData () {
    try {
        const res = yield call(getTransactionByUserApi);
        yield put(setTransactionListData(res.data));
    } catch (error) {
        yield put(showPopup(error));
    }
};

export default function* orderSaga() {
    yield takeLatest(GET_TRANSACTION_DATA, doGetTransactionData);
};