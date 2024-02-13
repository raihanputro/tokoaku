import { createSelector } from 'reselect';

import { initialState } from '@containers/Language/reducer';

const selectLanguage = (state) => state.language || initialState;

export const selectMessages = createSelector(selectLanguage, (state) => state.messages);
