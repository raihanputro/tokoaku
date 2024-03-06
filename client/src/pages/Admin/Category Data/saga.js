import { takeLatest, call, put } from "redux-saga/effects";
import { GET_CATEGORY_DATA, GET_CATEGORY_DETAIL_DATA, SET_CATEGORY_DATA, UPDATE_CATEGORY_DATA, DELETE_CATEGORY_DATA, CREATE_CATEGORY_DATA } from "./constants";
import { setCategoryData, setCategoryDetailData } from "./actions";
import { getAllCategoryApi, addCategoryApi, deleteCategoryApi, updateCategoryApi, getCategoryDetailApi } from "@domain/api";
import { setLoading, showPopup } from "@containers/App/actions";

function* doGetCategoryData () {
    try {
        const res = yield call(getAllCategoryApi);
        yield put(setCategoryData(res.data));
    } catch (error) {
        console.log(error);
    }
};

function* doGetCategoryDetailData ({id}) {
    try {
        const res = yield call(getCategoryDetailApi, id);
        yield put(setCategoryDetailData(res.data));
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

function* doUpdateCategoryData ({id, categoryData}) {
    try {
        yield call(updateCategoryApi, id, categoryData);
        const resAll = yield call(getAllCategoryApi);
        yield put(setCategoryData(resAll.data));
    } catch (error) {
        yield put(showPopup(error));
    }
};

function* doDeleteCategoryData ({id}) {
    try {
        yield call(deleteCategoryApi, id);
        const resAll = yield call(getAllCategoryApi);
        yield put(setCategoryData(resAll.data));
    } catch (error) {
        yield put(showPopup(error));
    }
};

export default function* categoryDataSaga() {
    yield takeLatest(GET_CATEGORY_DATA, doGetCategoryData);
    yield takeLatest(GET_CATEGORY_DETAIL_DATA, doGetCategoryDetailData);
    yield takeLatest(CREATE_CATEGORY_DATA, doCreateCategoryData);
    yield takeLatest(UPDATE_CATEGORY_DATA, doUpdateCategoryData);
    yield takeLatest(DELETE_CATEGORY_DATA, doDeleteCategoryData);
};