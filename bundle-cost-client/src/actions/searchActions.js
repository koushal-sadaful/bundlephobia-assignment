import {
    CLEAR_SEARCH_ERROR,
    SET_SEARCH_ERROR,
    UPDATE_SEARCH_QUERY_INPUT,
    UPDATE_SEARCH_SUGGESTIONS
} from "../constants/actions";
import {UrlHelper} from "../utils/urlHelper";
import axios from 'axios'


export function fetchSearchSuggestions(queryString) {
    return async (dispatch) => {
        try {
            const response = await axios.get(UrlHelper.getSearchSuggestions(queryString))
            dispatch({type: UPDATE_SEARCH_SUGGESTIONS, data: response.data});
            dispatch({type: CLEAR_SEARCH_ERROR});
        } catch (e) {
            dispatch({type: SET_SEARCH_ERROR, data: e.message});
        }
    }
}

export const updateSearchInputValue = (value) => {
    return (dispatch) => {
        dispatch({type: UPDATE_SEARCH_QUERY_INPUT, data: value});
    };
};