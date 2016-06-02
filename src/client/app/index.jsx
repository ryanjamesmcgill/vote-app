import React from 'react';
import {render} from 'react-dom';
import Application from './components/application.jsx';
import {setAppState} from './actions/AppStateActionCreators.js';

const __INITIAL_STATE__ = window.__INITIAL_STATE__;
console.log('initial state from browser:', __INITIAL_STATE__);
setAppState(__INITIAL_STATE__);

render(<Application initialState={__INITIAL_STATE__}/>, document.getElementById('app'));