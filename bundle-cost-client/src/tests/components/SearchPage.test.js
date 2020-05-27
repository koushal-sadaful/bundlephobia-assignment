import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {configure, mount} from 'enzyme';
import {Header, Search} from "semantic-ui-react";
import SearchPage from "../../components/SearchPage";
import {createTestStore} from "../testStoreFactory";
import axios from "axios";
import {runTheSnapshotTest} from "../testUtils/TestHelpers";

configure({adapter: new Adapter()});
jest.mock('axios');
jest.useFakeTimers()

describe("SearchPage", () => {
    let wrapper = null;
    afterEach(() => {
        if (wrapper){
            wrapper.unmount()
            wrapper = null
        }

    });

    it("should render a clean search page", () => {
        wrapper = mount(<SearchPage store={createTestStore()}/>);

        const pageTitle = wrapper.find(Header).first().props().content;
        expect(pageTitle).toMatch("Fake BundlePhobia");

        const searchBarProps = wrapper.find(Search).props();
        expect(searchBarProps.placeholder).toMatch("Type package name");

    });

    it("should pass the snapshot test", () => {
        runTheSnapshotTest(<SearchPage store={createTestStore()}/>)
    });
});