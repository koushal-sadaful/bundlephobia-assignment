import React from 'react'
import {push} from 'connected-react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    fetchSearchSuggestions
} from './../actions/searchActions'
import {Container, Header, Search, Grid, Select} from "semantic-ui-react";
import {updateSearchInputValue} from "../actions/searchActions";
import _ from 'lodash'
import {resetState} from "../actions/packageStatsActions";


class SearchPage extends React.Component {

    searchInputUpdated = (e, {value}) => {
        this.props.updateSearchInputValue(value);
        this.props.fetchSearchSuggestions(value)
    };

    handleResultSelect = (e, {result}) => {
        this.props.updateSearchInputValue(result.title);
        this.props.history.push(`/packageStats/${result.title}`)
    };

    componentWillUnmount() {
        this.props.resetState()
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Container textAlign='center'>
                        <Header
                            as='h2'
                            content="Fake BundlePhobia "
                            style={{
                                fontSize: '1.2em',
                                marginTop: '2em',
                            }}
                        />
                        <Header
                            as='h5'
                            style={{
                                fontSize: '1.2em',
                                fontWeight: 'normal',
                                marginBottom: 0,
                            }}
                        >
                            <Search
                                fluid
                                className="search-input"
                                value={this.props.searchInputValue}
                                onResultSelect={this.handleResultSelect}
                                onSearchChange={_.debounce(this.searchInputUpdated, 500, {leading: true})}
                                results={this.props.suggestions}
                                placeholder='Type package name'/>

                        </Header>
                    </Container>

                </Container>
            </div>
        )
    }
}


const mapStateToProps = ({search}) => ({
    suggestions: search.suggestions,
    searchInputValue: search.searchInputValue,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchSearchSuggestions,
    updateSearchInputValue,
    resetState,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage)