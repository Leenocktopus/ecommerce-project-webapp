import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import {getState, saveState} from "./reducers/storage";


const persistedState = getState();
const middleware = [thunk];

const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(...middleware)
);
store.subscribe(() => {
        saveState(store.getState());
    }
);
export default store;