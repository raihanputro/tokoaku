import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectTransactionDataState = (state) => state.transactionData || initialState;

export const selectTransactionData = createSelector(selectTransactionDataState, (state) => state.transactionsData);
