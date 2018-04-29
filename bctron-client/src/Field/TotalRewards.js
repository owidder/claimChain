import * as _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class TotalRewards extends Component {

    constructor(props) {
        super(props);
    }

    renderRewardRow(id) {

        const totalReward = this.props.idToReward[id];

        return (
            <tr>
                <td>{id}</td>
                <td>{totalReward}</td>
            </tr>
        )
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
                        {_.keys(this.props.idToReward).map(id => this.renderRewardRow(id))}
                    </tbody>
                </table>
            </div>
        );
    }
}

TotalRewards.propTypes = {
    idToReward: PropTypes.object
}
