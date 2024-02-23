import { takeLatest, call, put } from "redux-saga/effects";
import { GET_DETAIL_ITEM, SET_CART_ITEM } from "./constants";
import { setDataCart } from "@pages/Cart/actions";
import { getItemDetailApi, addCartApi, getCartApi } from "@domain/api";
import { setItemDetail } from "./actions";
import { setLoading, showPopup } from "@containers/App/actions";

function* doGetItemDetail ({ id, cb}) {
    try {
        const resItemDetail = yield call(getItemDetailApi, id);
        yield put(setItemDetail(resItemDetail.data));
        cb && cb();
    } catch (error) {
        yield put(showPopup(error));
    }
};

function* doPostCartItem ({ cartData }) {
    try {
        yield call(addCartApi, cartData);
        const resCart = yield call(getCartApi);
        yield put(setDataCart(resCart.data));
    } catch (error) {
        yield put(showPopup(error));
    }
};

export default function* itemDetailSaga() {
    yield takeLatest(GET_DETAIL_ITEM, doGetItemDetail);
    yield takeLatest(SET_CART_ITEM, doPostCartItem);
};