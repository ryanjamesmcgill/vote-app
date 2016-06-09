import React from 'react';
import {render} from 'react-dom';
import routes from './routes.jsx';
import { setAuthenticated } from './actions/AppStateActionCreators';
import { Router, browserHistory } from 'react-router';

if(window.__AUTHENTICATED__){
    setAuthenticated(window.__AUTHENTICATED__);
}

render(
    <Router routes={routes} history={browserHistory} />,
    document.getElementById('react-app')
);