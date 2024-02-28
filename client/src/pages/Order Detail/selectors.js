import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectTransactionDetailState = (state) => state.transactionDetail || initialState;

export const selectTransactionDetail = createSelector(selectTransactionDetailState, (state) => state.transactionDetail);
export const selectReviewTr = createSelector(selectTransactionDetailState, (state) => state.review);
