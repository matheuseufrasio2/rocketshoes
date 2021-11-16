import { createStore, compose, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware]

// const composeEnhancers = (typeof window != 'undefined' && compose(applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)) || compose(applyMiddleware(sagaMiddleware));

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(rootSaga);

export default store;
