import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import 'materialize-css/dist/css/materialize.css';
import './index.css';
import {EventList} from './EventList/EventList';
import {Field} from './Field/Field';
import './blockChain/blockChainEvents';
import {paramValue} from './util/query';

const mode = paramValue("mode");
const element = mode == "list" ? <EventList/> : <Field/>;

ReactDOM.render(<div>{element}</div>, document.getElementById('root'));

