import { takeLatest, call, put } from "redux-saga/effects";
import { GET_DATA_CART, UPDATE_DATA_CART, DELETE_DATA_CART } from "./constants";
import { getCartApi, updateCartApi, deleteCartApi } from "@domain/api";
import { setDataCart } from "./actions";
import { setLoading, showPopup } from "@containers/App/actions";

function* doGetCart ({id}) {
    yield put(setLoading(true));
    try {
        const resCart = yield call(getCartApi, id);
        yield put(setDataCart(resCart));
    } catch (error) {
        yield put(showPopup(error));
    }
    yield put(setLoading(false));
};

function* doUpdateCart ({id, dataCart, userId}) {
    try {
        yield call(updateCartApi, id, dataCart);
        const resCart = yield call(getCartApi, userId);
        yield put(setDataCart(resCart));
    } catch (error) {
        yield put(showPopup(error));
    }
}

function* doDeleteCart ({id, userId}) {
    try {
        yield call(deleteCartApi, id);
        const resCart = yield call(getCartApi, userId);
        yield put(setDataCart(resCart));
    } catch (error) {
        yield put(showPopup(error));
    }
}

export default function* cartSaga() {
    yield takeLatest(GET_DATA_CART, doGetCart);
    yield takeLatest(UPDATE_DATA_CART, doUpdateCart);
    yield takeLatest(DELETE_DATA_CART, doDeleteCart);
};