import { takeLatest, call, put } from "redux-saga/effects";
import { GET_USER_PROFILE } from "./constants";
import { setUserProfile } from "./actions";
import { profileUserApi } from "@domain/api";
import { setLoading, showPopup } from "@containers/App/actions";

function* doGetProfile() {
    try {
        const res = yield call(profileUserApi);
        console.log(res, 'profile mang')
        yield put(setUserProfile(res.data));
    } catch (error) {
        yield put(showPopup());
    }
}

export default function* profileSaga() {
    yield takeLatest(GET_USER_PROFILE, doGetProfile);
}

