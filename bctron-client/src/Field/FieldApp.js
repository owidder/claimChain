import * as _ from 'lodash';
import React, {Component} from 'react';
import 'materialize-css/dist/css/materialize.css';
import {addListener} from '../blockChain/blockChainEvents';
import * as $ from "jquery";
import {Field} from './Field';

const width = $(window).width();
const height = $(window).height();

const extractPositions = (events) => {
    return events
        .filter((event) => event.event == "Position")
        .map((event) => event.returnValues)
}

export class FieldApp extends Component {

    constructor(props) {
        super(props);
        this.state = {events: []}
    }

    drawPositions() {
        const positions = extractPositions(this.state.events);
        this.field.drawPositions(positions);
    }

    newEvent(event) {
        this.setState({events: [...this.state.events, event]})
        this.drawPositions();
    }

    componentDidMount() {
        this.field = new Field("div.field", width, height);
        addListener((event) => this.newEvent(event));
    }

    render() {
        return (
            <div className="field">
            </div>
        )
    }
}