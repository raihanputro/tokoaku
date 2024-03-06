import { SET_PROVINCE_DATA, SET_CITY_DATA, SET_SHIPPING_COST_DATA, SET_TRANSACTION_DATA, GET_PROVINCE_DATA, GET_CITY_DATA, GET_SHIPPING_COST_DATA, CREATE_TRANSACTION_DATA, SET_STEP_CHECKOUT } from "./constants";

export const setProvinceData = (provinceData) => ({
    type: SET_PROVINCE_DATA,
    provinceData,
});

export const getProvinceData = () => ({
    type: GET_PROVINCE_DATA,
});

export const setCityData = (cityData) => ({
    type: SET_CITY_DATA,
    cityData,
});

export const getCityData = (provinceId) => ({
    type: GET_CITY_DATA,
    provinceId
});

export const setShippingCostData = (shippingCost) => ({
    type: SET_SHIPPING_COST_DATA,
    shippingCost,
});

export const getShippingCostData = (shippingData) => ({
    type: GET_SHIPPING_COST_DATA,
    shippingData
});

export const setTransactionData = (transactionData) => ({
    type: SET_TRANSACTION_DATA,
    transactionData
});

export const createTransactionData = (transactionData, cbSuccess) => ({
    type: CREATE_TRANSACTION_DATA,
    transactionData,
    cbSuccess
});

export const setStepCheckout = (step) => ({
    type: SET_STEP_CHECKOUT,
    step
})