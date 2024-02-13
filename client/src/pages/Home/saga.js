import { takeLatest, call, put } from "redux-saga/effects";
import { GET_ITEM_LIST } from "./constants";
import { itemListApi } from "@domain/api";
import { setItemList } from "./actions";
import { setLoading, showPopup } from "@containers/App/actions";

function* doGetItem () {
    try {
        const res = yield call(itemListApi);
        yield put(setItemList(res));
    } catch (error) {
        yield put(showPopup(error));
    }
}

export default function* homeSaga() {
    yield takeLatest(GET_ITEM_LIST, doGetItem);
}