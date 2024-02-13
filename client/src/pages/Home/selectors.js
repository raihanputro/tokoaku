import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHomeState = (state) => state.home || initialState;

export const selectItem = createSelector(selectHomeState, (state) => state.items);
