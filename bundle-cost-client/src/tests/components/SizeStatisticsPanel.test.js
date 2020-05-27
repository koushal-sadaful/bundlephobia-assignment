import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {configure, mount} from 'enzyme';
import {Card, Statistic} from "semantic-ui-react";
import SizeStatisticsPanel from "../../components/SizeStatisticsPanel";
import {runTheSnapshotTest} from "../testUtils/TestHelpers";
configure({adapter: new Adapter()});

describe("SizeStatisticsPanel", () => {
    let wrapper = null;
    const defaultTestProps = {
        minifiedSize: 2115154,
        minifiedAndGzipedSize: 1452635,
        unpackedSize: 41545421
    };

    afterEach(() => {
        if (wrapper){
            wrapper.unmount()
            wrapper = null
        }
    });

    it("should render all the sizes in pretty format", () => {
        wrapper = mount(<SizeStatisticsPanel {...defaultTestProps} />);

        const allHeaderValues = wrapper.find(Card.Header).map(it => it.props().children);
        const allStatsValues = wrapper.find(Statistic.Value).map(it => it.props().children);

        expect(allHeaderValues).toEqual(['MINIFIED', 'MINIFIED + GZIPPED', 'UNPACKED']);
        expect(allStatsValues).toEqual(["2.12 MB", "1.45 MB", "41.5 MB",]);
    });

    it("should handle missing sizes", () => {
        wrapper = mount(<SizeStatisticsPanel {...{}} />);

        const allHeaderValues = wrapper.find(Card.Header).map(it => it.props().children);
        const allStatsValues = wrapper.find(Statistic.Value).map(it => it.props().children);

        expect(allHeaderValues).toEqual(['MINIFIED', 'MINIFIED + GZIPPED', 'UNPACKED']);
        expect(allStatsValues).toEqual(["-", "-", "-",]);
    });

    it("should handle wrong type of sizes", () => {
        const testProps = {
            minifiedSize: "abx",
            minifiedAndGzipedSize: 1452635,
            unpackedSize: "41545421"
        };
        wrapper = mount(<SizeStatisticsPanel {...testProps} />);

        const allHeaderValues = wrapper.find(Card.Header).map(it => it.props().children);
        const allStatsValues = wrapper.find(Statistic.Value).map(it => it.props().children);

        expect(allHeaderValues).toEqual(['MINIFIED', 'MINIFIED + GZIPPED', 'UNPACKED']);
        expect(allStatsValues).toEqual(["-", "1.45 MB", "-",]);
    });

    it("should pass the snapshot test", () => {
        runTheSnapshotTest(<SizeStatisticsPanel {...defaultTestProps} />)
    });

});