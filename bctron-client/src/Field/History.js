import * as _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

const renderPositionRow = (position) => {
    if(_.isEmpty(position.id)) {
        return (
            <tr key={position.hash}>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        )
    }
    return (
        <tr key={position.hash}>
            <td>{position.blockNumber}</td>
            <td>{position.id}</td>
            <td>{position.reward}</td>
            <td>{position.totalReward}</td>
        </tr>
    )
}

const renderHeadRow = () => {
    return (
        <tr>
            <th>B#</th>
            <th>id</th>
            <th>reward</th>
            <th>total</th>
        </tr>
    )
}

const renderTitle = (x, y) => {
    if(_.isFinite(x) && _.isFinite(y)) {
        return (
            <b>{x} / {y}</b>
        )
    }

    return (
        <b>Nothing selected</b>
    )
}

export class History extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {renderTitle(this.props.x, this.props.y)}
                <table>
                    <thead>
                        {renderHeadRow()}
                    </thead>
                    <tbody>
                        {this.props.positions.map((position) => renderPositionRow(position))}
                    </tbody>
                </table>
            </div>
        );
    }
}

History.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    positions: PropTypes.array
}
