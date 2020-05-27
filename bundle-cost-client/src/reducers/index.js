import {combineReducers} from 'redux'
import search from './searchReducer'
import packageStats from './packageStatsReducer'
import {connectRouter} from 'connected-react-router'

export default (history) => combineReducers({
    router: connectRouter(history),
    search,
    packageStats
})