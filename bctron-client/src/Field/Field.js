import * as _ from 'lodash';
import React, {Component} from 'react';
import {addListenerForPositions, addListenerForHeadPositions} from '../blockChain/blockChainEvents';
import * as $ from "jquery";
import {SvgField} from './SvgField';
import {History} from './History';
import {TotalRewards} from './TotalRewards';

const width = $(window).width() * (10/12);
const height = $(window).height();

export class Field extends Component {

    constructor(props) {
        super(props);

        this.state = {
            x: undefined,
            y: undefined,
            history: [],
            totalRewards: {}
        }
    }

    newHistory(x, y, history) {
        this.setState({x, y, history});
    }

    updateTotalRewards(eventWithTotalReward) {
        const id = eventWithTotalReward.id;
        const totalRewards = {...this.state.totalRewards, [id]: eventWithTotalReward.totalReward};
        this.setState({totalRewards});
    }

    newPosition(position) {
        this.updateTotalRewards(position);
        this.svgField.newPosition(position);
    }

    componentDidMount() {
        this.svgField = new SvgField("div.field", width, height, (x, y, history) => this.newHistory(x, y, history));
        addListenerForPositions((newPosition) => this.newPosition(newPosition));
        addListenerForHeadPositions((headPositions) => this.svgField.newHeadPositions(headPositions));
    }

    render() {
        return (
            <div className="row">
                <div className="field col s10">
                </div>
                <div className="lists col s2">
                    <TotalRewards idToReward={this.state.totalRewards}/>
                    <br/>
                    <History x={Number(this.state.x)} y={Number(this.state.y)} positions={this.state.history}/>
                </div>
            </div>
        )
    }
}