import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectLoginState = (state) => state.login || initialState;

export const selectInfoLogin = createSelector(selectLoginState, (state) => state.userData);
