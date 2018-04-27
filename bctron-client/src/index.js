import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './index.css';
import {EventList} from './EventList/EventList';
import {FieldApp} from './Field/FieldApp';
import './blockChain/blockChainEvents';

ReactDOM.render(
    <Router>
        <div>
            <Link to="/Field?wsHost=1">Field</Link>&nbsp;|&nbsp;
            <Link to="/List?wsHost=1">List</Link>
            <Route path="/field" component={FieldApp}/>
            <Route path="/list" component={EventList}/>
        </div>
    </Router>
    , document.getElementById('root'));

