import React from 'react';
import {render} from 'react-dom';
import Layout from './components/layout.jsx';
import Application from './components/application.jsx';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import {setAppState} from './actions/AppStateActionCreators.js';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

//const __INITIAL_STATE__ = window.__INITIAL_STATE__;
//console.log('initial state from browser:', __INITIAL_STATE__);
//setAppState(__INITIAL_STATE__);

//render(<Application initialState={__INITIAL_STATE__}/>, document.getElementById('app'));

render((
    <Router history={hashHistory}>
        <Route path="/" component={Layout} >
            <IndexRoute component={Application}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup} />
        </Route>
    </Router>
), document.getElementById('app'));