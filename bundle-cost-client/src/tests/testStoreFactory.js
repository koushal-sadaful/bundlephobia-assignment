import search from '../reducers/searchReducer'
import packageStats from '../reducers/packageStatsReducer'
import thunk from "redux-thunk";
import {applyMiddleware, combineReducers, createStore} from "redux";

export const createTestStore = () => {
    const testReducers = {
        search,
        packageStats
    };

    const middleware = [thunk];
    return createStore(combineReducers(testReducers), applyMiddleware(...middleware))
}