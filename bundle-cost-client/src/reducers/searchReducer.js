import {
    CLEAR_SEARCH_ERROR,
    RESET_STATE,
    SET_SEARCH_ERROR,
    UPDATE_SEARCH_QUERY_INPUT,
    UPDATE_SEARCH_SUGGESTIONS
} from '../constants/actions'

const initialState = {
    searchInputValue: "",
    suggestions: [],
    errorMessage: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SEARCH_SUGGESTIONS:
            const suggestions = action.data.map(
                (item) => {
                    return {
                        title: item["package"]["name"],
                        description: item["package"]["description"],
                        version: item["package"]["version"],
                    }
                }
            );
            return {
                ...state,
                suggestions: suggestions
            };
        case UPDATE_SEARCH_QUERY_INPUT:
            return {
                ...state,
                searchInputValue: action.data
            };
        case SET_SEARCH_ERROR:
            return {
                ...state,
                errorMessage: action.data
            };
        case CLEAR_SEARCH_ERROR:
            return {
                ...state,
                errorMessage: null
            };
        case RESET_STATE:
            return initialState;
        default:
            return state
    }
}
