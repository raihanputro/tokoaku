import { takeLatest, call, put } from "redux-saga/effects";
import { SET_USER_REGISTER } from "./constants";
import { registerUserApi, userListApi } from "@domain/api";
import { setUserData } from "@pages/UserData/actions";
import { setLoading, showPopup } from "@containers/App/actions";

function* doRegister({ userData, cb }) {
    try {
        yield call(registerUserApi, userData);
        const res = yield call(userListApi);
        yield put(setUserData(res));
        cb();
    } catch (error) {
        yield put(showPopup(error));
    }
}

export default function* registerSaga() {
    yield takeLatest(SET_USER_REGISTER, doRegister);
}

