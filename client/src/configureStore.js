import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import createReducer from './reducers';
import rootSaga from './rootSaga';
import { peristConfig } from './persistence';

const initState = {};

// eslint-disable-next-line default-param-last
const configureStore = (initialState = {}) => {
  let composeEnhancers = compose;
  const reduxSagaMonitorOptions = {
    effectMiddlewares: [],
  };

  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }

  const persistedReducer = persistReducer(peristConfig, createReducer());
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const middlewares = [sagaMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(persistedReducer, initialState, composeEnhancers(...enhancers));

  store.runSaga = sagaMiddleware.run;

  // run saga
  store.runSaga(rootSaga);
  return store;
};

const store = configureStore(initState);

export default store;
export const persistor = persistStore(store);
