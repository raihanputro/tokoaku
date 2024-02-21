import { takeLatest, call, put } from "redux-saga/effects";
import { GET_CATEGORY_DATA, GET_CATEGORY_DETAIL_DATA, SET_CATEGORY_DATA, UPDATE_CATEGORY_DATA, DELETE_CATEGORY_DATA } from "./constants";
import { setCategoryData } from "./actions";
import { getAllCategoryApi } from "@domain/api";
import { setLoading, showPopup } from "@containers/App/actions";

function* doGetCategory () {
    try {
        const res = yield call(getAllCategoryApi);
        yield put(setCategoryData(res.data));
    } catch (error) {
        console.log(error)
    }
};

export default function* categoryDataSaga() {
    yield takeLatest(GET_CATEGORY_DATA, doGetCategory);
}