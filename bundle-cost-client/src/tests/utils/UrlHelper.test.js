import React from "react";
import {UrlHelper} from "../../utils/urlHelper";


describe("UrlHelper", () => {

    it("should construct correct URL to fetch package stats", () => {
        expect(UrlHelper.getPackageStatsUrl("axios")).toEqual("http://localhost:8000/api/package/axios");
    });

    it("should construct correct URL to fetch search suggestions", () => {
        expect(UrlHelper.getSearchSuggestions("axios")).toEqual("https://api.npms.io/v2/search/suggestions?q=axios&size=10");
    });

    it("should construct correct URL to fetch search suggestions with limit", () => {
        expect(UrlHelper.getSearchSuggestions("axios", 20)).toEqual("https://api.npms.io/v2/search/suggestions?q=axios&size=20");
    });
});

