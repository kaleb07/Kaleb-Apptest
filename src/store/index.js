import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import sagas from './sagas';
import reducers from './ducks';
import Reactotron from 'reactotron-react-native';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();

let middlewares = [];
middlewares.push(sagaMiddleware);

let middleware = applyMiddleware(...middlewares);
const enhancer = compose(middleware);
const store = createStore(reducers, initialState, enhancer);

sagaMiddleware.run(sagas);

export default store;
