import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectCartState = (state) => state.cart || initialState;

export const selectCart = createSelector(selectCartState, (state) => state.cartData);
