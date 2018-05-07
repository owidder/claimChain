import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import 'materialize-css/dist/css/materialize.css';
import './index.css';
import {EventList} from './EventList/EventList';
import {Field} from './Field/Field';
import './blockChain/blockChainEvents';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Field}/>
            <Route path="/list" component={EventList}/>
        </div>
    </Router>
    , document.getElementById('root'));

