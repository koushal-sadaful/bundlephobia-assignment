import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {configure, mount} from 'enzyme';
import SizeStatisticsPanel from "../../components/SizeStatisticsPanel";
import SizeChartPanel from "../../components/SizeChartPanel";
import {BarChart} from "recharts";
import {runTheSnapshotTest} from "../testUtils/TestHelpers";


configure({adapter: new Adapter()});

describe("SizeStatisticsPanel", () => {
    let wrapper = null;
    let defaultTestProps = {
        data: [
            {
                version: "0.18.1",
                unpackedSize: 293785,
                minifiedSize: 11357,
                minifiedAndGzipedSize: 4225
            },
            {
                version: "0.19.1",
                unpackedSize: 348347,
                minifiedSize: 13466,
                minifiedAndGzipedSize: 5010
            },
            {
                version: "0.19.2",
                unpackedSize: 346079,
                minifiedSize: 13378,
                minifiedAndGzipedSize: 4978
            }
        ]
    };

    afterEach(() => {
        if (wrapper){
            wrapper.unmount()
            wrapper = null
        }
    });

    it("should render the chart after transforming data", () => {
        wrapper = mount(<SizeChartPanel {...defaultTestProps} />);
        const barChartProps = wrapper.find(BarChart).props();

        expect(barChartProps.data).toEqual([
            {name: '0.18.1', minified: 11357, gzip: 4225},
            {name: '0.19.1', minified: 13466, gzip: 5010},
            {name: '0.19.2', minified: 13378, gzip: 4978}
        ]);
    });
});