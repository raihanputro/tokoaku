import { takeLatest, call, put } from "redux-saga/effects";
import { GET_TRANSACTION_DATA} from "./constants";
import { getTransactionByUserApi } from "@domain/api";
import { setTransactionListData } from "./actions";
import { setStepCheckout } from "@pages/Checkout/actions";
import { setLoading, showPopup } from "@containers/App/actions";


function* doGetTransactionData () {
    yield put(setLoading(true));
    try {
        const res = yield call(getTransactionByUserApi);
        yield put(setTransactionListData(res.data));
        yield put(setStepCheckout(0));
    } catch (error) {
        yield put(showPopup(error));
    }
    yield put(setLoading(false));
};

export default function* orderSaga() {
    yield takeLatest(GET_TRANSACTION_DATA, doGetTransactionData);
};