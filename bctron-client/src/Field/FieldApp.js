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
        this.state = {positions: {}}
    }

    newPositions(_newPositions) {
        this.setState({positions: _newPositions})
        this.field.drawPositions(this.state.positions);
    }

    componentDidMount() {
        this.field = new Field("div.field", width, height);
        addListenerForPositions((newPositions) => this.newPositions(newPositions));
    }

    render() {
        return (
            <div className="field">
            </div>
        )
    }
}