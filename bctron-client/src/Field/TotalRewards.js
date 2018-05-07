import * as _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class TotalRewards extends Component {

    constructor(props) {
        super(props);
    }

    renderRow(position) {

        return (
            <tr key={position.id}>
                <td>{position.id}</td>
                <td>{position.totalReward}</td>
                <td>{this.props.currentBlockNumber > 0 ? this.props.currentBlockNumber - position.blockNumber : '-'}</td>
                <td>{this.props.currentBlockNumber > 0 ? this.props.currentBlockNumber - position.blockNumberOfBirth : '-'}</td>
            </tr>
        )
    }

    sortedPositionArray() {
        const positionArray = _.values(this.props.idToPosition);
        positionArray.sort((a, b) => {
            return Number(a.totalReward) < Number(b.totalReward);
        });

        return positionArray;
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>total rewards</th>
                            <th>next reward</th>
                            <th>age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.sortedPositionArray().map((position) => this.renderRow(position))}
                    </tbody>
                </table>
            </div>
        );
    }
}

TotalRewards.propTypes = {
    idToPosition: PropTypes.object,
    currentBlockNumber: PropTypes.number
}
