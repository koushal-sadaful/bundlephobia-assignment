import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Grid} from "semantic-ui-react";
import {fetchPackageStats, resetState} from "../actions/packageStatsActions";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import SizeStatisticsPanel from "./SizeStatisticsPanel";
import PackageStatsHeader from "./PackageStatsHeader";
import SizeChartPanel from "./SizeChartPanel";


class PackageStats extends React.Component {

    componentDidMount() {
        this.props.fetchPackageStatsFromNPM(this.props.packageName);
    }

    componentWillUnmount() {
        this.props.resetState()
    }

    render() {
        if (!this.props.data)
            return <Loader active={true}/>;

        const data = this.props.data;

        return (
            <div>
                <Grid className="package-stats">
                    <Grid.Row centered={true}>
                        <PackageStatsHeader
                            name={this.props.packageName}
                            version={data.version}
                            description={data.description}

                        />
                    </Grid.Row>
                    <Grid.Row columns={2} className="package-stats-content">
                        <Grid.Column width={5}>
                            <SizeStatisticsPanel
                                unpackedSize={data.unpackedSize}
                                minifiedSize={data.minifiedSize}
                                minifiedAndGzipedSize={data.minifiedAndGzipedSize}
                            />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <SizeChartPanel data={data.chartData}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>

        )
    }
}


const mapStateToProps = (state, ownProps) => ({
    packageName: ownProps.match.params.packageName,
    version: ownProps.match.params.version || null,
    data: state.packageStats.data,
    errorMessage: state.packageStats.errorMessage
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchPackageStatsFromNPM: fetchPackageStats,
    resetState
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PackageStats)