import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import registerSaga from '@pages/Register/saga';
import loginSaga from '@pages/Login/saga';
import homeSaga from '@pages/Home/saga';
import searchSaga from '@pages/Search/saga';
import profileSaga from '@pages/Profile/saga';
import itemDetailSaga from '@pages/Detail Item/saga';
import wishlistSaga from '@pages/Wishlist/saga';
import cartSaga from '@pages/Cart/saga';
import checkoutSaga from '@pages/Checkout/saga';
import orderSaga from '@pages/Order/saga';
import transactionDetailSaga from '@pages/Order Detail/saga';
import userDataSaga from '@pages/Admin/User Data/saga';
import itemDataSaga from '@pages/Admin/Item Data/saga';
import categoryDataSaga from '@pages/Admin/Category Data/saga';
import transactionDataSaga from '@pages/Admin/TransactionData/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    registerSaga(),
    loginSaga(),
    homeSaga(),
    searchSaga(),
    profileSaga(),
    itemDetailSaga(),
    wishlistSaga(),
    cartSaga(),
    checkoutSaga(),
    orderSaga(),
    transactionDetailSaga(),
    userDataSaga(),
    itemDataSaga(),
    categoryDataSaga(),
    transactionDataSaga()
  ]);
}
