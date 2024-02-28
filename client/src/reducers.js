import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import languageReducer from '@containers/Language/reducer';
import homeReducer, { storedKey as storedHomeState } from '@pages/Home/reducer';
import profileReducer, { storedKey as storedProfileState } from '@pages/Profile/reducer';
import itemDetailReducer, { storedKey as storedItemDetailState } from '@pages/Detail Item/reducer';
import cartReducer, { storedKey as storedCartState} from '@pages/Cart/reducer';
import checkoutReducer, { storedKey as storedCheckoutState} from '@pages/Checkout/reducer';
import orderReducer, { storedKey as storedOrderState } from '@pages/Order/reducer';
import transactionDetailReducer, { storedKey as storedTransactionDetailState } from '@pages/Order Detail/reducer';
import wishlistReducer, { storedKey as storedWishlistState} from '@pages/Wishlist/reducer';
import userDataReducer, { storedKey  as storedUserDataState } from '@pages/Admin/User Data/reducer';
import itemDataReducer, { storedKey  as storedItemDataState } from '@pages/Admin/Item Data/reducer';
import categoryDataReducer, { storedKey  as storedCategoryDataState } from '@pages/Admin/Category Data/reducer';

import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  home: { reducer: homeReducer, whitelist: storedHomeState },
  profile: { reducer: profileReducer, whitelist: storedProfileState },
  itemDetail: { reducer: itemDetailReducer, whitelist: storedItemDetailState },
  wishlist: { reducer: wishlistReducer, whitelist: storedWishlistState },
  cart: { reducer: cartReducer, whitelist: storedCartState },
  checkout: { reducer: checkoutReducer, whitelist: storedCheckoutState },
  order: { reducer: orderReducer, whitelist: storedOrderState },
  transactionDetail: { reducer: transactionDetailReducer, whitelist: storedTransactionDetailState },
  userData: { reducer: userDataReducer, whitelist: storedUserDataState },
  itemData: { reducer: itemDataReducer, whitelist: storedItemDataState},
  categoryData: { reducer: categoryDataReducer, whitelist: storedCategoryDataState},
};

const temporaryReducers = {
  language: languageReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
