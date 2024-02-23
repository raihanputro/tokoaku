import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectCheckoutState = (state) => state.checkout || initialState;

export const selectProvince = createSelector(selectCheckoutState, (state) => state.province);
export const selectCity = createSelector(selectCheckoutState, (state) => state.city);
export const selectShippingCost = createSelector(selectCheckoutState, (state) => state.shippingCost);
export const selectTransaction = createSelector(selectCheckoutState, (state) => state.transaction);
