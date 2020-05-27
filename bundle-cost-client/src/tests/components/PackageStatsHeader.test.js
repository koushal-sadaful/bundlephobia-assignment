import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {configure, mount} from 'enzyme';
import PackageStatsHeader from "../../components/PackageStatsHeader";
import {Card, Button} from "semantic-ui-react";
import {BrowserRouter} from "react-router-dom";
import {runTheSnapshotTest} from "../testUtils/TestHelpers";

configure({adapter: new Adapter()});

describe("PackageStatsHeader", () => {
    let wrapper = null;
    let defaultTestProps = {
        name: "De Brie",
        version: "1.0",
        description: "Le fromage que j'aime"
    };

    afterEach(() => {
        if (wrapper){
            wrapper.unmount()
            wrapper = null
        }
    });

    it("should render package details", () => {
        wrapper = mount(<BrowserRouter><PackageStatsHeader {...defaultTestProps} /> </BrowserRouter>);

        expect(wrapper.find(Card.Header).props().children).toMatch(defaultTestProps.name);
        expect(wrapper.find(Card.Meta).props().children).toMatch(`[${defaultTestProps.version}]`);
        expect(wrapper.find(Card.Description).props().children).toMatch(defaultTestProps.description);
        expect(wrapper.find(Button).props().children[1]).toMatch("Search another package");
    });

    it("should render nothing if missing props", () => {
        const testProps = {
            name: "De Brie"
        };
        wrapper = mount(<BrowserRouter> <PackageStatsHeader {...testProps} /> </BrowserRouter>);

        expect(wrapper.find(Card.Header).props().children).toMatch(testProps.name);
        expect(wrapper.find(Card.Meta).props().children).toMatch(`[]`);
        expect(wrapper.find(Card.Description).props().children).toMatch("");
    });

    it("should pass the snapshot test", () => {
        runTheSnapshotTest(<BrowserRouter> <PackageStatsHeader {...defaultTestProps} /> </BrowserRouter>)
    });

});