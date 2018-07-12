import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd';

export class ClaimCard extends Component {

    render() {
        const title = this.props.hash ? (this.props.account ? "Text has been claimed" : "Text has not yet been claimed") : "Nothing to claim";
        return (
            <Card title={title}>
                <p>hash: {this.props.hash}</p>
                <p>block time: {this.props.blockTime}</p>
                <p>block number: {this.props.blockNo}</p>
                <p>account: {this.props.account}</p>
            </Card>
        )
    }
}

ClaimCard.propTypes = {
    hash: PropTypes.string,
    blockTime: PropTypes.string,
    blockNo: PropTypes.string,
    account: PropTypes.string,
}
