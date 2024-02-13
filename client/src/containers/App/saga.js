import { takeLatest, call, put } from 'redux-saga/effects';

import { ping } from '@domain/api';
import { showPopup, setLoading } from '@containers/App/actions';
import { PING } from '@containers/App/constants';

function* doPing() {
  yield put(setLoading(true));
  try {
    yield call(ping);
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

export default function* appSaga() {
  yield takeLatest(PING, doPing);
}
