import {createTestStore} from "../testStoreFactory";
import React from "react";
import {fetchSearchSuggestions, updateSearchInputValue} from "../../actions/searchActions";
import axios from 'axios';
import {searchSuggestionDataPayloadJSON} from "../testUtils/searchSuggestionDataPayload";

jest.mock('axios');
let testStore = null;
const expectedSearchSuggestionData = [
    {
        "title": "axios",
        "version": "0.19.2",
        "description": "Promise based HTTP client for the browser and node.js",
    },
    {
        "title": "axios-retry",
        "version": "3.1.8",
        "description": "Axios plugin that intercepts failed requests and retries them whenever posible.",
    },
    {
        "title": "axios-hooks",
        "version": "1.10.0",
        "description": "axios-hooks",
    }
];

describe("Search Reducer", () => {

    beforeEach(() => testStore = createTestStore());

    it("should have expected empty state", () => {
        expect(testStore.getState().search).toEqual(getExpectedState());
    });

    it("should update the search input value", () => {
        testStore.dispatch(updateSearchInputValue("Baguette"))
        expect(testStore.getState().search).toEqual(getExpectedState("Baguette"));
    });

    it("should update the suggestions if response is 200", async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve(searchSuggestionDataPayloadJSON));

        await testStore.dispatch(fetchSearchSuggestions("axios"))
        expect(testStore.getState().search).toEqual(getExpectedState("", expectedSearchSuggestionData));
    });

    it("should update the error message if response is error", async () => {
        axios.get.mockImplementationOnce(() => Promise.reject(new Error("Some dumb error")));

        await testStore.dispatch(fetchSearchSuggestions("axios"))
        expect(testStore.getState().search).toEqual(getExpectedState("", [], "Some dumb error"))
    });

    it("should clear the previous error message if response is 200", async () => {
        axios.get.mockImplementationOnce(() => Promise.reject(new Error("Some dumb error")));
        await testStore.dispatch(fetchSearchSuggestions("axios"))
        expect(testStore.getState().search).toEqual(getExpectedState("", [], "Some dumb error"));

        axios.get.mockImplementationOnce(() => Promise.resolve(searchSuggestionDataPayloadJSON));
        await testStore.dispatch(fetchSearchSuggestions("axios"))
        expect(testStore.getState().search).toEqual(getExpectedState("", expectedSearchSuggestionData, null));
    });


});

function getExpectedState(searchInputValue = "", suggestions = [], errorMsg = null) {
    return {
        searchInputValue: searchInputValue,
        suggestions: suggestions,
        errorMessage: errorMsg
    };
}