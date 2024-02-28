import { takeLatest, call, put } from "redux-saga/effects";
import { GET_PROVINCE_DATA, GET_CITY_DATA, GET_SHIPPING_COST_DATA, CREATE_TRANSACTION_DATA } from "./constants";
import { setProvinceData, setCityData, setShippingCostData } from "./actions";
import { getProvinceApi, getCityApi, getShippingCostApi, addTransactionApi, getCartApi } from "@domain/api";
import { setDataCart } from "@pages/Cart/actions";
import { setLoading, showPopup } from "@containers/App/actions";

function* doGetProvince () {
    try {
        const res = yield call(getProvinceApi);
        yield put(setProvinceData(res.data.rajaongkir.results));
    } catch (error) {
        console.log(error)
    }
};

function* doGetCity ({ provinceId }) {
    try {
        const res = yield call(getCityApi, provinceId);
        yield put(setCityData(res.data.rajaongkir.results));
    } catch (error) {
        console.log(error);
    }
};

function* doGetShippingCost ({ shippingData }) {
    yield put(setLoading(true));
    try {
        const res = yield call(getShippingCostApi, shippingData);
        yield put(setShippingCostData(res.data.rajaongkir.results[0].costs[0].cost[0].value))
    } catch (error) {
        console.log(error);
    }
    yield put(setLoading(false));
};

function* doPostTransactionData ({ transactionData }) {
    yield put(setLoading(true));
    try {
        yield call(addTransactionApi, transactionData);
        const resCart = yield call(getCartApi);
        yield put(setDataCart(resCart));
    } catch (error) {
        console.log(error);
    }
    yield put(setLoading(false));
};

export default function* checkoutSaga() {
    yield takeLatest(GET_PROVINCE_DATA, doGetProvince);
    yield takeLatest(GET_CITY_DATA, doGetCity);
    yield takeLatest(GET_SHIPPING_COST_DATA, doGetShippingCost);
    yield takeLatest(CREATE_TRANSACTION_DATA, doPostTransactionData);
};