import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
//import thunk from 'redux-thunk';

import catalogReducer from './reducer';

const middleWare = applyMiddleware(promise(), logger);
const reducers = combineReducers({
    catalog: catalogReducer
})

const store = createStore(reducers, middleWare)

export default store;