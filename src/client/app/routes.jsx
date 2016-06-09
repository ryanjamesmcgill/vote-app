import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/layout.jsx';
import Login from './components/pages/login.jsx';
import Signup from './components/pages/signup.jsx';
import Create from './components/pages/create.jsx';
import Question from './components/pages/question.jsx';
import Profile from './components/pages/profile.jsx';
import NotFound from './components/pages/notfound.jsx';
import { checkAuthenticationLocal } from './utils/utils';


module.exports = (
    <Route path="/" component={Layout} >
        <IndexRoute component={Question} />
        <Route path="/poll" component={Question} />
        <Route path="/poll/:id" component={Question} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/create" component={Create} />
        <Route path="/profile" component={Profile} onEnter={ checkAuthenticationLocal }/>
        <Route path="*" component={NotFound} />
    </Route>
);