import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectOrderState = (state) => state.order || initialState;

export const selectTransactionList = createSelector(selectOrderState, (state) => state.transactionList);
