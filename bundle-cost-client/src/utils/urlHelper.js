import {PACKAGE_STATS_API_URL, SEARCH_SUGGESTION_URL} from "../config/URL";

export class UrlHelper {
    static getPackageStatsUrl = (packageName) => {
        return `${PACKAGE_STATS_API_URL}/${packageName}`
    };

    static getSearchSuggestions = (queryString, limit = 10) => {
        return `${SEARCH_SUGGESTION_URL}?q=${queryString}&size=${limit}`
    }

}