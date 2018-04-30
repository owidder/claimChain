import * as _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class TotalRewards extends Component {

    constructor(props) {
        super(props);
    }

    renderRewardRow(rewardObject) {

        return (
            <tr key={rewardObject.id}>
                <td>{rewardObject.id}</td>
                <td>{rewardObject.reward}</td>
            </tr>
        )
    }

    sortedRewardArray() {
        const rewardArray = _.keys(this.props.idToReward).map((id) => {
            const reward = this.props.idToReward[id];
            return {id, reward}
        });
        rewardArray.sort((a, b) => {
            return Number(a.reward) < Number(b.reward);
        });

        return rewardArray;
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>total rewards</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.sortedRewardArray().map((rewardObject) => this.renderRewardRow(rewardObject))}
                    </tbody>
                </table>
            </div>
        );
    }
}

TotalRewards.propTypes = {
    idToReward: PropTypes.object
}
