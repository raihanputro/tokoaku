import { takeLatest, call, put } from "redux-saga/effects";
import { GET_ITEM_SEACH } from "./constants";
import { getItemBySearchApi } from "@domain/api";
import { setItemSearch } from "./actions";
import { setLoading, showPopup } from "@containers/App/actions";

function* doGetItemSearch ({ name, category_id }) {
    try {
        const res = yield call(getItemBySearchApi, name, category_id);
        yield put(setItemSearch(res.data));
    } catch (error) {
        yield put(showPopup());
    }
};


export default function* searchSaga() {
    yield takeLatest(GET_ITEM_SEACH, doGetItemSearch);
};