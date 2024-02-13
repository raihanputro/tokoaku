import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import registerSaga from '@pages/Register/saga';
import loginSaga from '@pages/Login/saga';
import homeSaga from '@pages/Home/saga';
import profileSaga from '@pages/Profile/saga';
import itemDetailSaga from '@pages/Detail Item/saga';
import cartSaga from '@pages/Cart/saga';
import userDataSaga from '@pages/UserData/saga';
import itemDataSaga from '@pages/ItemData/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    registerSaga(),
    loginSaga(),
    homeSaga(),
    profileSaga(),
    itemDetailSaga(),
    cartSaga(),
    userDataSaga(),
    itemDataSaga()
  ]);
}
