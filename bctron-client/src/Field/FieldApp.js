import * as _ from 'lodash';
import React, {Component} from 'react';
import 'materialize-css/dist/css/materialize.css';
import {addListenerForPositions} from '../blockChain/blockChainEvents';
import * as $ from "jquery";
import {Field} from './Field';

const width = $(window).width();
const height = $(window).height();

export class FieldApp extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.field = new Field("div.field", width, height);
        addListenerForPositions((newPosition) => this.field.newPosition(newPosition));
    }

    render() {
        return (
            <div className="field">
            </div>
        )
    }
}