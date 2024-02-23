import { takeLatest, call, put } from "redux-saga/effects";
import { jwtDecode } from 'jwt-decode';

import { SET_USER_LOGIN } from "./constants";
import { loginUserApi, getCartApi, getWishlistByUserApi, profileUserApi } from "@domain/api";
import { setLogin, setToken, setUser } from "@containers/Client/actions";
import { setDataCart } from "@pages/Cart/actions";
import { setUserProfile } from "@pages/Profile/actions";
import { setWishlistData } from "@pages/Wishlist/actions";
import { setLoading, showPopup } from "@containers/App/actions";

function* doLogin ({ userData, cb}) {
    try {
        const res = yield call(loginUserApi, userData);
        yield put(setLogin(true));
        yield put(setToken(res.token));
        const decodedJwt = jwtDecode(res.token);
        const resCart = yield call(getCartApi);
        const resWishlist = yield call(getWishlistByUserApi);
        const resProfile = yield call(profileUserApi);
        yield put(setUserProfile(resProfile.data));
        yield put(setDataCart(resCart.data));
        yield put(setWishlistData(resWishlist.data));
        yield put(setUser(decodedJwt));
        cb && cb();
    } catch (error) {
        yield put(showPopup(error));
    }
}

export default function* loginSaga() {
    yield takeLatest(SET_USER_LOGIN, doLogin);
}