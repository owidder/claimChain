import * as _ from 'lodash';
import React, {Component} from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.css';
import {addListener} from '../blockChain/blockChainEvents';

const isValueKey = (key) => {
    return isNaN(key);
}

const renderEventReturnValues = (returnValues) => {
    const valueStrings = [];
    _.keys(returnValues).forEach((key) => {
        if(isValueKey(key)) {
            valueStrings.push(returnValues[key]);
        }
    })

    return <pre>
        {valueStrings.join("\n")}
    </pre>
}

const renderEventReturnKeys = (returnValues) => {
    const keyStrings = [];
    _.keys(returnValues).forEach((key) => {
        if(isValueKey(key)) {
            keyStrings.push(key);
        }
    })

    return <pre>
        {keyStrings.join("\n")}
    </pre>
}

const renderEvent = (event) => {
    return (
        <tr key={event.transactionHash + "." + event.event}>
            <td>
                {event.event}
            </td>
            <td>
                {renderEventReturnKeys(event.returnValues)}
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
        addListener((event) => this.newEvent(event));
    }

    render() {
        return (
            <div className="App">
                <table>
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Keys</th>
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
