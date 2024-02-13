import { takeLatest, call, put } from "redux-saga/effects";
import { SET_ITEM_DATA, DELETE_ITEM_DATA, UPDATE_ITEM_DATA } from "./constants";
import { itemListApi, addItemApi, updateItemApi, deleteItemApi } from "@domain/api";
import { setItemList } from "@pages/Home/actions";
import { setLoading, showPopup } from "@containers/App/actions";

function* doPostItem ({itemData}) {
    try {
        yield call(addItemApi, itemData);
        const res = yield call(itemListApi);
        yield put(setItemList(res));
    } catch (error) {
        yield put(showPopup(error));
    }
};

function* doUpdateItem ({id, itemData}) {
    try {
        yield call(updateItemApi, id, itemData);
        const res = yield call(itemListApi);
        yield put(setItemList(res));
    } catch (error) {
        yield put(showPopup(error));
    }
}

function* doDeleteItem ({id}) {
    try {
        yield call(deleteItemApi, id);
        const res = yield call(itemListApi);
        yield put(setItemList(res));
    } catch (error) {
        yield put(showPopup(error));
    }
};

export default function* itemDataSaga() {
    yield takeLatest(SET_ITEM_DATA, doPostItem);
    yield takeLatest(UPDATE_ITEM_DATA, doUpdateItem);
    yield takeLatest(DELETE_ITEM_DATA, doDeleteItem);
}