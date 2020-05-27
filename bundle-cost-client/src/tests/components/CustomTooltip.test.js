import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {configure, mount} from 'enzyme';
import {Message} from "semantic-ui-react";
import CustomTooltip from "../../components/CustomTooltip";
import {runTheSnapshotTest} from "../testUtils/TestHelpers";

configure({adapter: new Adapter()});

describe("CustomTooltip", () => {
    let wrapper = null;
    let fakePayload = [
        {
            dataKey: "gzip",
            name: "gzip",
            value: 4225,
            payload: {
                name: "0.18.1",
                minified: 11357,
                gzip: 4225,
            }
        }, {
            dataKey: "minified",
            name: "minified",
            value: 11357,
            payload: {
                name: "0.18.1",
                minified: 11357,
                gzip: 4225,
            }
        }
    ];

    let defaultTestProps = {
        active: true,
        label: "0.18.1",
        payload: fakePayload
    };

    afterEach(() => {
        if (wrapper){
            wrapper.unmount()
            wrapper = null
        }
    });

    it("should not render anything if is not active", () => {
        const testProps = {...defaultTestProps, ...{active: false}};
        wrapper = mount(<CustomTooltip {...testProps} />);
        expect(wrapper.find(Message).exists()).toEqual(false);
    });

    it("should render the label and sizes in the tooltip", () => {
        wrapper = mount(<CustomTooltip {...defaultTestProps} />);
        const tooltipText = wrapper.find(Message).props().children.map(child => child.props.children);
        expect(tooltipText).toEqual(['version: 0.18.1', 'gzip: 4.22 kB', 'minified: 11.4 kB']);
    });

    it("should not render anything if missing data", () => {
        const testProps = {...defaultTestProps, ...{payload: []}};
        wrapper = mount(<CustomTooltip {...testProps} />);
        expect(wrapper.find(Message).exists()).toEqual(false);
    });

    it("should pass the snapshot test", () => {
        runTheSnapshotTest(<CustomTooltip {...defaultTestProps} />)
    });

});