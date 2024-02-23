import { takeLatest, call, put } from "redux-saga/effects";
import { GET_PROVINCE_DATA, GET_CITY_DATA, GET_SHIPPING_COST_DATA } from "./constants";
import { setProvinceData, setCityData, setShippingCostData } from "./actions";
import { getProvinceApi, getCityApi, getShippingCostApi } from "@domain/api";
import { setLoading, showPopup } from "@containers/App/actions";

function* doGetProvince () {
    try {
        const res = yield call(getProvinceApi);
        console.log(res, 'test saga');
        yield put(setProvinceData(res.data.rajaongkir.results));
    } catch (error) {
        console.log(error)
    }
};

function* doGetCity ({ provinceId }) {
    try {
        const res = yield call(getCityApi, provinceId);
        console.log(res, 'city nih')
        yield put(setCityData(res.data.rajaongkir.results));
    } catch (error) {
        console.log(error);
    }
};

function* doGetShippingCost ({ shippingData }) {
    try {
        const res = yield call(getShippingCostApi, shippingData);
        console.log(res.data.rajaongkir.results[0].costs[0].cost[0].value, 'ongkirsaga');
        yield put(setShippingCostData(res.data.rajaongkir.results[0].costs[0].cost[0].value))
    } catch (error) {
        console.log(error);
    }
}

export default function* checkoutSaga() {
    yield takeLatest(GET_PROVINCE_DATA, doGetProvince);
    yield takeLatest(GET_CITY_DATA, doGetCity);
    yield takeLatest(GET_SHIPPING_COST_DATA, doGetShippingCost);
};