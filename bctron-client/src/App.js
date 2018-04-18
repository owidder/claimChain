import * as _ from 'lodash';
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from './webSocket/webSocketHub';

const renderEventReturnValues = (returnValues) => {
    const valueStrings = [];
    _.keys(returnValues).forEach((key) => {
        valueStrings.push(key + ":" + returnValues[key]);
    })

    return <span>
        {valueStrings.join("<br>")}
    </span>
}

const renderEvent = (event) => {
    return (
        <tr key={event.transactionHash}>
            <td>
                {event.event}
            </td>
            <td>
                {renderEventReturnValues(event.returnValues)}
            </td>
        </tr>
    )
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {events: []}
    }

    newEvent(event) {
        this.setState({events: [...this.state.events, event]})
    }

    componentDidMount() {
        connect(1337, (event) => this.newEvent(event));
    }

    render() {
        return (
            <div className="App">
                <table>
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Values</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.events.map((event) => renderEvent(event))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
