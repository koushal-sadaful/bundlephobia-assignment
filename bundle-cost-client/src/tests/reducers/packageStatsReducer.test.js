import {createTestStore} from "../testStoreFactory";
import React from "react";
import {fetchSearchSuggestions, updateSearchInputValue} from "../../actions/searchActions";
import axios from 'axios';
import {searchSuggestionDataPayloadJSON} from "../testUtils/searchSuggestionDataPayload";
import {fetchPackageStats, resetState} from "../../actions/packageStatsActions";
import {packageStatsDataPayload} from "../testUtils/packageStatsDataPayload";

jest.mock('axios');
let testStore = null;


describe("Package Stats Reducer", () => {

    beforeEach(() => testStore = createTestStore());

    it("should have expected empty state", () => {
        expect(testStore.getState().packageStats).toEqual({
            data: null,
            errorMessage: null
        });
    });

    it("should fetch the package stats", async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve(packageStatsDataPayload));
        await testStore.dispatch(fetchPackageStats("axios"))
        expect(testStore.getState().packageStats).toEqual({
            data: packageStatsDataPayload.data,
            errorMessage: null
        });
    });

    it("can reset the state", async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve(packageStatsDataPayload));
        await testStore.dispatch(fetchPackageStats("axios"))

        await testStore.dispatch(resetState());
        expect(testStore.getState().packageStats).toEqual({
            data: null,
            errorMessage: null
        });
    });
});
