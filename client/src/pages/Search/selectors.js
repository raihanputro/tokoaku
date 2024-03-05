import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectSearchState = (state) => state.search || initialState;

export const selectItemBySearch = createSelector(selectSearchState, (state) => state.itemSearch);
