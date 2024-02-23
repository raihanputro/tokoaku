import { takeLatest, call, put } from "redux-saga/effects";
import { GET_WISHLIST_DATA, SET_WISHLIST_DATA, POST_WISHLIST_DATA, DELETE_WISHLIST_DATA } from "./constants";
import { getWishlistByUserApi, addWishlistApi, deleteWishlistApi } from "@domain/api";
import { setWishlistData } from "./actions";
import { setLoading, showPopup } from "@containers/App/actions";

function* doGetWishlist () {
    try {
        const res = yield call(getWishlistByUserApi);
        yield put(setWishlistData(res.data));
    } catch (error) {
        yield put(showPopup(error));
    }
};

function* doPostWishlist ({ wishlistData }) {
    try {
        yield call(addWishlistApi, wishlistData);
        const res = yield call(getWishlistByUserApi);
        yield put(setWishlistData(res.data));
    } catch (error) {
        yield put(showPopup(error));
    }
};

function* doDeleteWishlist ({ id }) {
    try {
        yield call(deleteWishlistApi, id);
        const res = yield call(getWishlistByUserApi);
        yield put(setWishlistData(res.data));
    } catch (error) {
        yield put(showPopup(error));
    }
};

export default function* wishlistSaga() {
    yield takeLatest(GET_WISHLIST_DATA, doGetWishlist);
    yield takeLatest(POST_WISHLIST_DATA, doPostWishlist);
    yield takeLatest(DELETE_WISHLIST_DATA, doDeleteWishlist);
};
