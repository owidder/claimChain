import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, Button} from 'antd';
import {startRegisterHashTransaction} from './blockChain/claimChainCaller';

export class ClaimCard extends Component {

    renderClaimButton() {
        <Button type="primary" onClick={() => startRegisterHashTransaction(this.props.hash)}>Claim</Button>
    }

    render() {
        const title = this.props.hash ? (this.props.account ? "Text has been claimed" : "Text has not yet been claimed") : "Nothing to claim";
        return (
            <Card title={title}>
                <p>hash: {this.props.hash} {this.renderClaimButton()}</p>
                <p>block time: {this.props.blockTime}</p>
                <p>block number: {this.props.blockNo}</p>
                <p>account: {this.props.account}</p>
                <p>contract address: {this.props.contractAddress}</p>
            </Card>
        )
    }
}

ClaimCard.propTypes = {
    hash: PropTypes.string,
    blockTime: PropTypes.string,
    blockNo: PropTypes.string,
    account: PropTypes.string,
    contractAddress: PropTypes.string,
}
