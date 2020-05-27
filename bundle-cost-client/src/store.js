import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk'
import * as History from 'history'
import createRouteReducer from './reducers'
import logger from 'redux-logger'

export const history = History.createBrowserHistory();

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history), logger];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

export default createStore(
    createRouteReducer(history),
    initialState,
    composedEnhancers
)