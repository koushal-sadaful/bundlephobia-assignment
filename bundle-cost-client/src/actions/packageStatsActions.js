import {
    CLEAR_PACKAGE_STATS_ERROR,
    FETCH_PACKAGE_DETAILS_FROM_NPM, RESET_STATE, SET_PACKAGE_STATS_ERROR, SET_SEARCH_ERROR, UPDATE_SEARCH_QUERY_INPUT
} from "../constants/actions";
import {UrlHelper} from "../utils/urlHelper";

const axios = require('axios');

export function fetchPackageStats(packageName) {
    return async (dispatch) => {
        try {
            const response = await axios.get(UrlHelper.getPackageStatsUrl(packageName));
            dispatch({type: FETCH_PACKAGE_DETAILS_FROM_NPM, data: response.data});
            dispatch({type: CLEAR_PACKAGE_STATS_ERROR});
        } catch (e) {
            dispatch({type: SET_PACKAGE_STATS_ERROR, data: e.message});
        }
    }
}

export const resetState = () => {
    return (dispatch) => {
        dispatch({type: RESET_STATE});
    };
};