import { takeLatest, call, put } from "redux-saga/effects";
import { GET_USER_PROFILE, UPDATE_USER_PROFILE, CHANGE_PASS_PROFILE } from "./constants";
import { setUserProfile } from "./actions";
import { profileUserApi, updateProfileUserApi, changePasswordUserApi } from "@domain/api";
import { setLoading, showPopup } from "@containers/App/actions";

function* doGetProfile() {
    try {
        const res = yield call(profileUserApi);
        yield put(setUserProfile(res.data));
    } catch (error) {
        yield put(showPopup());
    }
};

function* doUpdateProfile ({ profileData, cbSuccess, cbFailed }) {
    try {
        yield call(updateProfileUserApi, profileData);
        cbSuccess && cbSuccess();
    } catch (error) {
        if (error?.response?.data?.message) {
            cbFailed && cbFailed(error?.response?.data?.message);
        } 
    }
};

function* doChangePassword ({ changePassData, cbSuccess, cbFailed }) {
    try {
        yield call(changePasswordUserApi, changePassData);
        cbSuccess && cbSuccess();
    } catch (error) {
        if (error?.response?.data?.message) {
            cbFailed && cbFailed(error?.response?.data?.message);
        } 
    }
};

export default function* profileSaga() {
    yield takeLatest(GET_USER_PROFILE, doGetProfile);
    yield takeLatest(UPDATE_USER_PROFILE, doUpdateProfile);
    yield takeLatest(CHANGE_PASS_PROFILE, doChangePassword);
};

