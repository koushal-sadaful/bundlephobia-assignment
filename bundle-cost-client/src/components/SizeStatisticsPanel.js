import {Card, Grid, Statistic} from "semantic-ui-react";
import React from "react";
import {prettifySize} from "../utils/sizeHelper";


const SizeStatisticsPanel = (props) => {

    return (
        <div className="statistics-panel">
            <Card.Group>
                <Card>
                    <Card.Content>
                        <Statistic>
                            <Statistic.Value>{prettifySize(props.minifiedSize)}</Statistic.Value>
                        </Statistic>
                        <Card.Header>MINIFIED</Card.Header>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Statistic>
                            <Statistic.Value>{prettifySize(props.minifiedAndGzipedSize)}</Statistic.Value>
                        </Statistic>
                        <Card.Header>MINIFIED + GZIPPED</Card.Header>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Statistic>
                            <Statistic.Value>{prettifySize(props.unpackedSize)}</Statistic.Value>
                        </Statistic>
                        <Card.Header>UNPACKED</Card.Header>
                    </Card.Content>
                </Card>
            </Card.Group>
        </div>
    );
};

export default SizeStatisticsPanel