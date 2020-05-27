import React from "react";
import {prettifySize} from "../utils/sizeHelper";
import {Message} from "semantic-ui-react";

const CustomTooltip = (props) => {

    const {active} = props;
    if (active) {
        const {payload, label} = props;
        if (payload && payload.length > 0)
            return (
                <Message floating>
                    <p className="tooltip-label">{`version: ${label}`}</p>
                    <p className="tooltip-label">{`${payload[0].dataKey}: ${prettifySize(payload[0].value)}`}</p>
                    <p className="tooltip-label">{`${payload[1].dataKey}: ${prettifySize(payload[1].value)}`}</p>
                </Message>
            );
    }
    return (<div/>)
};

export default CustomTooltip