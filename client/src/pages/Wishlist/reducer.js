import { produce } from 'immer';

import { SET_WISHLIST_DATA } from './constants';

export const initialState = {
  wishlistData: {}
};

export const storedKey = ['wishlistData'];

const wishlistReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_WISHLIST_DATA:
        draft.wishlistData = action.wishlistData;
        break;
    }
  });

export default wishlistReducer;
