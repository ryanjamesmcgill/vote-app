var React = require('react');
var AppStateStore = require('../stores/AppStateStore');
var UserInfo = require('./userinfo.jsx');
var Login = require('./login.jsx');
var SignUp = require('./signup.jsx');
import {setGreeting} from '../actions/AppStateActionCreators.js';


var Application = React.createClass({
    _onAppStateChange: function(){
        var AppState = AppStateStore.getAppState();
        this.setState(AppState);
    },
    componentDidMount: function(){
        AppStateStore.addChangeListener(this._onAppStateChange);
    },
    componentWillUnmount: function() {
        AppStateStore.removeChangeListener(this._onAppStateChange);
    },
    render: function() {
        console.log('rendering app');
        return (
            <div>
                <h3>index page</h3>
            </div>);
    }
});

module.exports = Application;

