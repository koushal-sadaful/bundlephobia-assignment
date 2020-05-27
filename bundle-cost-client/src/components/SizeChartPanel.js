import {Card, Grid, Statistic} from "semantic-ui-react";
import React from "react";
import {
    BarChart, Bar, Cell, XAxis,  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import CustomTooltip from "./CustomTooltip";


const SizeChartPanel = (props) => {

    const chartData = props.data.map(item => {
        return {
            name: item.version,
            minified: item.minifiedSize,
            gzip: item.minifiedAndGzipedSize
        }
    });

    return (
        <div className="chart-panel">
            <Card fluid>
                <ResponsiveContainer width='100%' aspect={2.0 / 1.0}>
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 20, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <XAxis dataKey="name"/>
                        <Tooltip content={<CustomTooltip/>}/>
                        <Legend/>
                        <Bar dataKey="gzip" stackId="a" fill="#82ca9d"/>
                        <Bar dataKey="minified" stackId="a" fill="#8884d8"/>
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default SizeChartPanel