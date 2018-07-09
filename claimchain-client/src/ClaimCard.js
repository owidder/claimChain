import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd';

export class ClaimCard extends Component {

    render() {
        return (
            <Card title="Text has been claimed">

            </Card>
        )
    }
}

ClaimCard.propTypes = {
    claimTime: PropTypes.string,
    claimBlockNo: PropTypes.number,
    claimAccount: PropTypes.string,
}
