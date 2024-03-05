import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectProfileState = (state) => state.profile || initialState;

export const selectStep = createSelector(selectProfileState, (state) => state.step);
export const selectProfile = createSelector(selectProfileState, (state) => state.userData);
