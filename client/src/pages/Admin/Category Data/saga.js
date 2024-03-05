import { takeLatest, call, put } from "redux-saga/effects";
import { GET_CATEGORY_DATA, GET_CATEGORY_DETAIL_DATA, SET_CATEGORY_DATA, UPDATE_CATEGORY_DATA, DELETE_CATEGORY_DATA, CREATE_CATEGORY_DATA } from "./constants";
import { setCategoryData } from "./actions";
import { getAllCategoryApi, addCategoryApi } from "@domain/api";
import { setLoading, showPopup } from "@containers/App/actions";

function* doGetCategoryData () {
    try {
        const res = yield call(getAllCategoryApi);
        yield put(setCategoryData(res.data));
    } catch (error) {
        console.log(error);
    }
};

function* doCreateCategoryData ({ categoryData}) {
    try {
        const res = yield call(addCategoryApi, categoryData);
        const resAll = yield call(getAllCategoryApi);
        yield put(setCategoryData(resAll.data));
    } catch (error) {
        yield put(showPopup(error));
    }
};

export default function* categoryDataSaga() {
    yield takeLatest(GET_CATEGORY_DATA, doGetCategoryData);
    yield takeLatest(CREATE_CATEGORY_DATA, doCreateCategoryData);
};