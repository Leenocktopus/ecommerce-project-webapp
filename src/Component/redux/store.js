import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import persistState from 'redux-localstorage'


const combineEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25
}) || compose;


const store = createStore(
    rootReducer,
    combineEnhancers(applyMiddleware(thunk), persistState(['cartState', 'userState']))
);
export default store;