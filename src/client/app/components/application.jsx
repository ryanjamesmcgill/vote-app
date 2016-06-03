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
        var Markup;
        if(this.state.user){
            Markup = <div>
                        <h3>User Info:</h3>
                        <p>DisplayName: {this.state.user.displayName}</p>
                        <p>Domain: {this.state.user.domain}</p>
                        <a href="/logout">logout</a>
                    </div>;
        } else {
            Markup = <div>
                        <a href="/auth/facebook">login with facebook</a><br/>
                        <a href="/auth/twitter">login with twitter</a><br/>
                        <a href="/auth/google">login with google+</a><br/>
                    </div>;
        }
        console.log('rendering app');
        return (
            <div>
                <p> Hello! {this.state.greeting}</p>

                <button onClick={()=>{setGreeting('you clicked the button!')}}>click me</button>
                <br />
                {Markup}
            </div>);
    }
});

module.exports = Application;

