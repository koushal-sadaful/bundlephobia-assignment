import {
    CLEAR_PACKAGE_STATS_ERROR,
    FETCH_PACKAGE_DETAILS_FROM_NPM,
    RESET_STATE,
    SET_PACKAGE_STATS_ERROR
} from '../constants/actions'

const initialState = {
    data: null,
    errorMessage: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PACKAGE_DETAILS_FROM_NPM:
            return {
                ...state,
                data: action.data
            };
        case SET_PACKAGE_STATS_ERROR:
            return {
                ...state,
                errorMessage: action.data
            };
        case CLEAR_PACKAGE_STATS_ERROR:
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
