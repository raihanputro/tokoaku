import { takeLatest, call, put } from "redux-saga/effects";
import { DELETE_USER_DATA, GET_DETAIL_USER_DATA, GET_USER_DATA, UPDATE_USER_DATA } from "./constants";
import { userListApi, userDetailApi, updateUserApi, deleteUserApi } from "@domain/api";
import { setUserData, setUserDataDetail } from "./actions";
import { setLoading, showPopup } from "@containers/App/actions";

function* doGetuserData () {
    try {
        const res = yield call(userListApi);
        yield put(setUserData(res));
    } catch (error) {
        yield put(showPopup(error));
    }
};

function* doGetUserDataDetail ({id}) {
    try {
        const resUserDetail = yield call(userDetailApi, id);
        yield put(setUserDataDetail(resUserDetail));
    } catch (error) {
        yield put(showPopup(error));
    }
};

function* doUpdateUserDataDetail ({id, userData}) {
    try {
        yield call(updateUserApi, id, userData);
        const res = yield call(userListApi);
        yield put(setUserData(res));
    } catch (error) {
        yield put(showPopup(error));
    }
}

function* doDeleteUserData ({id}) {
    try {
        yield call(deleteUserApi, id);
        const res = yield call(userListApi);
        yield put(setUserData(res));
    } catch (error) {
        yield put(showPopup(error));
    }
};

export default function* userDataSaga() {
    yield takeLatest(GET_USER_DATA, doGetuserData);
    yield takeLatest(GET_DETAIL_USER_DATA, doGetUserDataDetail);
    yield takeLatest(UPDATE_USER_DATA, doUpdateUserDataDetail);
    yield takeLatest(DELETE_USER_DATA, doDeleteUserData);
}