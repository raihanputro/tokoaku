import { takeLatest, call, put } from "redux-saga/effects";
import { jwtDecode } from 'jwt-decode';

import { SET_USER_LOGIN } from "./constants";
import { loginUserApi, getCartApi } from "@domain/api";
import { setLogin, setToken, setUser } from "@containers/Client/actions";
import { setDataCart } from "@pages/Cart/actions";
import { setLoading, showPopup } from "@containers/App/actions";

function* doLogin ({ userData, cb}) {
    try {
        const res = yield call(loginUserApi, userData);
        yield put(setLogin(true));
        yield put(setToken(res.result));
        const decodedJwt = jwtDecode(res.result);
        const resCart = yield call(getCartApi, decodedJwt.id);
        yield put(setDataCart(resCart));
        yield put(setUser(decodedJwt));
        cb && cb();
    } catch (error) {
        yield put(showPopup(error));
    }
}

export default function* loginSaga() {
    yield takeLatest(SET_USER_LOGIN, doLogin);
}