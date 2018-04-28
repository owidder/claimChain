import * as _ from 'lodash';
import React, {Component} from 'react';
import 'materialize-css/dist/css/materialize.css';
import {addListenerForPositions, addListenerForHeadPositions} from '../blockChain/blockChainEvents';
import * as $ from "jquery";
import {SvgField} from './SvgField';

const width = $(window).width();
const height = $(window).height();

export class Field extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.svgField = new SvgField("div.field", width, height);
        addListenerForPositions((newPosition) => this.svgField.newPosition(newPosition));
        addListenerForHeadPositions((headPositions) => this.svgField.newHeadPositions(headPositions));
    }

    render() {
        return (
            <div className="field">
            </div>
        )
    }
}