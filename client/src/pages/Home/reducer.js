import { produce } from 'immer';

import { SET_ITEM_LIST} from './constants';

export const initialState = {
  items: [],
};

export const storedKey = ['items'];

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ITEM_LIST:
        draft.items = action.items;
        break;
    }
  });

export default homeReducer;
