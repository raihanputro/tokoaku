import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectCategoryDataState = (state) => state.categoryData || initialState;

export const selectCategoryData = createSelector(selectCategoryDataState, (state) => state.categoryData);
export const selectCategoryDetailData = createSelector(selectCategoryDataState, (state) => state.categoryDetailData);
