import { produce } from "immer";

import { SET_PROVINCE_DATA, SET_CITY_DATA, SET_SHIPPING_COST_DATA, SET_TRANSACTION_DATA } from "./constants";

export const initialState = {
    province: [],
    city: [],
    shippingCost: null,
    transaction: {},
};

export const storedKey = [''];

const checkoutReducer = ( state = initialState, action ) => 
    produce(state, (draft) => {
        switch(action.type) {
            case SET_PROVINCE_DATA:
                draft.province = action.provinceData;
                break;
            case SET_CITY_DATA:
                draft.city = action.cityData;
                break;
            case SET_SHIPPING_COST_DATA:
                draft.shippingCost = action.shippingCost;
                break;
            case SET_TRANSACTION_DATA:
                draft.transaction = action.transactionData;
        }
    });

export default checkoutReducer;