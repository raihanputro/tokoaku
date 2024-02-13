import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectUserDataState = (state) => state.userData || initialState;

export const selectUserDataAdmin = createSelector(selectUserDataState, (state) => state.userDataAdmin);
