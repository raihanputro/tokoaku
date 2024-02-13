import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectItemDetailState = (state) => state.itemDetail || initialState;

export const selectItemDetail = createSelector(selectItemDetailState, (state) => state.itemDetailData);
