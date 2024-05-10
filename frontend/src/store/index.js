import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';

import { sessionReducer } from './sessionReducer';
import { itemModalReducer } from './itemModal';
import { cartReducer } from './cartReducer';
import { navReducer } from './navReducer';

const rootReducer = combineReducers({
    session: sessionReducer,
    itemModal: itemModalReducer,
    cart:cartReducer,
    nav: navReducer
});

const isProduction = process.env.NODE_ENV === 'production';

let enhancer;

if (isProduction) {
    enhancer = applyMiddleware(thunk);
}
else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer)
}

export default configureStore;