import {Button, Card, Icon} from "semantic-ui-react";
import React from "react";
import {Link} from "react-router-dom";


const PackageStatsHeader = (props) => {
    return (
        <div className="package-stats-header">
            <Card fluid>
                <Card.Content>
                    <Card.Header style={{
                        fontSize: '2.5em',
                        padding: '0.3em'
                    }}>
                        {props.name || "Not Available"}
                    </Card.Header>
                    <Card.Meta>
                        {`[${props.version || ""}]`}
                    </Card.Meta>
                    <Card.Description>
                        {props.description || ""}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Link to="/">
                        <Button icon labelPosition='left'>
                            <Icon name='search'/>
                            Search another package
                        </Button>
                    </Link>
                </Card.Content>
            </Card>
        </div>
    );
};

export default PackageStatsHeader