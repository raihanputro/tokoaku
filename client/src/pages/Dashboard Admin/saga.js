import { takeLatest, call, put } from "redux-saga/effects";
import { jwtDecode } from 'jwt-decode';
import { SET_USER_LOGIN } from "./constants";
import { loginUserApi } from "@domain/api";
import { setUserInfoLogin } from "./actions";
import { setLogin, setToken } from "@containers/Client/actions";
import { setLoading, showPopup } from "@containers/App/actions";

function* doLogin ({ userData, cb}) {
    yield put(setLoading(true));
    try {
        const res = yield call(loginUserApi, userData);
        yield put(setLogin(true));
        yield put(setToken(res.result));
        yield put(setUserInfoLogin(jwtDecode(res.result)));
        cb && cb();
    } catch (error) {
        yield put(showPopup());
    }
    yield put(setLoading(false))
}

export default function* loginSaga() {
    yield takeLatest(SET_USER_LOGIN, doLogin);
}