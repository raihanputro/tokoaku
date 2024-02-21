import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import languageReducer from '@containers/Language/reducer';
import homeReducer, { storedKey as storedHomeState } from '@pages/Home/reducer';
import profileReducer, { storedKey as storedProfileState } from '@pages/Profile/reducer';
import itemDetailReducer, { storedKey as storedItemDetailState } from '@pages/Detail Item/reducer';
import cartReducer, { storedKey as storedCartState} from '@pages/Cart/reducer';
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
  cart: { reducer: cartReducer, whitelist: storedCartState },
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
