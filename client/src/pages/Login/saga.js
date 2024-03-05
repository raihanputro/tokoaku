import { takeLatest, call, put } from "redux-saga/effects";
import { jwtDecode } from 'jwt-decode';
import { SET_USER_LOGIN } from "./constants";
import { loginUserApi, getCartApi, getWishlistByUserApi, profileUserApi } from "@domain/api";
import { setLogin, setToken, setUser } from "@containers/Client/actions";
import { setDataCart } from "@pages/Cart/actions";
import { setUserProfile } from "@pages/Profile/actions";
import { setWishlistData } from "@pages/Wishlist/actions";
import { showPopup } from "@containers/App/actions";

function* doLogin ({ userData, cbFailed }) {
    try {
        const res = yield call(loginUserApi, userData);
        yield put(setLogin(true));
        yield put(setToken(res.token));
        const decodedJwt = jwtDecode(res.token);
        if (decodedJwt.role !== 'Admin') {
            const resCart = yield call(getCartApi);
            const resWishlist = yield call(getWishlistByUserApi);
            yield put(setDataCart(resCart.data));
            yield put(setWishlistData(resWishlist.data));
        }
        const resProfile = yield call(profileUserApi);
        yield put(setUserProfile(resProfile.data));
        yield put(setUser(decodedJwt));
    } catch (error) {
        if (error?.response?.data?.message) {
            cbFailed && cbFailed(error?.response?.data?.message);
        } 
    }
}

export default function* loginSaga() {
    yield takeLatest(SET_USER_LOGIN, doLogin);
}