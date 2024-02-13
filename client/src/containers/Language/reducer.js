import { produce } from 'immer';

import id from '@languages/id';
import en from '@languages/en';

import { SET_MESSAGES } from '@containers/Language/constants';

export const initialState = {
  messages: {
    id: { ...id },
    en: { ...en },
  },
};

const languageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_MESSAGES:
        draft.messages = action.messages;
        break;
    }
  });

export default languageReducer;
