import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectProfileState = (state) => state.login || initialState;

export const selectInfoLogin = createSelector(selectProfileState, (state) => state.infoLoginData);
