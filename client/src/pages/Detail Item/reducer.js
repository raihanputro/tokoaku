import { produce } from 'immer';

import { SET_DETAIL_ITEM, SET_CART_ITEM } from './constants';

export const initialState = {
  itemDetailData: {},
  cart: {}
};

export const storedKey = ['itemDetailData'];

const itemDetailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_DETAIL_ITEM:
        draft.itemDetailData = action.item;
        break;
      case SET_CART_ITEM:
        draft.cart = action.cartData;
    }
  });

export default itemDetailReducer;
