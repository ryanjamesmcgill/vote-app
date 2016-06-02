var React = require('react');
var AppStateStore = require('../stores/AppStateStore');
import {setGreeting} from '../actions/AppStateActionCreators.js';


var Application = React.createClass({
    getInitialState: function(){
        return (this.props.initialState);
    },
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
        return (
            <div>
                <p> Hello! {this.state.greeting}</p>
                <button onClick={()=>{setGreeting('you clicked the button!')}}>click me</button>
            </div>);
    }
});

module.exports = Application;

