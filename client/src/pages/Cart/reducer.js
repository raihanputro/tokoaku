import { produce } from 'immer';

import { SET_DATA_CART } from './constants';

export const initialState = {
  cartData: {}
};

export const storedKey = ['cartData'];

const cartReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_DATA_CART:
        draft.cartData = action.cart;
        break;
    }
  });

export default cartReducer;
