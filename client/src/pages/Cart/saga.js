import { takeLatest, call, put } from "redux-saga/effects";
import { GET_DATA_CART, UPDATE_DATA_CART, DELETE_DATA_CART } from "./constants";
import { getCartApi, updateCartApi, deleteCartApi } from "@domain/api";
import { setDataCart } from "./actions";
import { setLoading, showPopup } from "@containers/App/actions";

function* doGetCart () {
    yield put(setLoading(true));
    try {
        const resCart = yield call(getCartApi);
        yield put(setDataCart(resCart));
    } catch (error) {
        yield put(showPopup(error));
    }
    yield put(setLoading(false));
};

function* doUpdateCart ({id, dataCart, cbFailed}) {
    try {
        yield call(updateCartApi, id, dataCart);
        const resCart = yield call(getCartApi);
        yield put(setDataCart(resCart.data));
    } catch (error) {
        if (error?.response?.data?.message) {
            cbFailed && cbFailed(error?.response?.data?.message);
        }   
    }
};

function* doDeleteCart ({id}) {
    try {
        yield call(deleteCartApi, id);
        const resCart = yield call(getCartApi);
        yield put(setDataCart(resCart.data));
    } catch (error) {
        yield put(showPopup(error));
    }
};

export default function* cartSaga() {
    yield takeLatest(GET_DATA_CART, doGetCart);
    yield takeLatest(UPDATE_DATA_CART, doUpdateCart);
    yield takeLatest(DELETE_DATA_CART, doDeleteCart);
};