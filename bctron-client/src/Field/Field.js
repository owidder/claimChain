import * as _ from 'lodash';
import React, {Component} from 'react';
import {addListenerForPositions, addListenerForHeadPositions} from '../blockChain/blockChainEvents';
import * as $ from "jquery";
import {SvgField} from './SvgField';
import {History} from './History';

const width = $(window).width() * (10/12);
const height = $(window).height();

export class Field extends Component {

    constructor(props) {
        super(props);

        this.state = {
            x: undefined,
            y: undefined,
            history: []
        }
    }

    newHistory(x, y, history) {
        this.setState({x, y, history});
    }

    componentDidMount() {
        this.svgField = new SvgField("div.field", width, height, (x, y, history) => this.newHistory(x, y, history));
        addListenerForPositions((newPosition) => this.svgField.newPosition(newPosition));
        addListenerForHeadPositions((headPositions) => this.svgField.newHeadPositions(headPositions));
    }

    render() {
        return (
            <div className="row">
                <div className="field col s10">
                </div>
                <div className="lists col s2">
                    <History x={Number(this.state.x)} y={Number(this.state.y)} positions={this.state.history}/>
                </div>
            </div>
        )
    }
}