import React from 'react';
import {render} from 'react-dom';
import Layout from './components/layout.jsx';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import Create from './components/create.jsx';
import Question from './components/question.jsx';
import { Router, Route, hashHistory, browserHistory, IndexRoute } from 'react-router';


render((
    <Router history={browserHistory}>
        <Route path="/" component={Layout} >
            <IndexRoute component={Question} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/create" component={Create} />
        </Route>
    </Router>
), document.getElementById('react-app'));