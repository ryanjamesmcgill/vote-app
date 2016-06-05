var React = require('react');
import { checkAuthentication, logoutUser } from '../utils/utils';
import AppStateStore from '../stores/AppStateStore.js';
import { Link } from 'react-router';

var Application = React.createClass({
    getInitialState: function(){
        var state = AppStateStore.getAppState();
        return (state);
    },
    componentWillMount: function(){
        checkAuthentication();
    },
    componentDidMount: function(){
        AppStateStore.addChangeListener(this._onAppStateChange);
    },
    componentWillUnmount: function(){
        AppStateStore.removeChangeListener(this._onAppStateChange);
    },
    _onAppStateChange: function(){
        var state = AppStateStore.getAppState();
        this.setState(state);
    },
    render: function() {
        var navbar;
        if(this.state.authenticated){
            navbar = <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="/create">Submit Question</Link>
                        </li>
                        <li>
                            <Link to="/profile">My Profile</Link>
                        </li>
                        <li>
                            <a onClick={logoutUser} href="#">Logout</a>
                        </li>
                    </ul>
        } else {
            navbar = <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="/create">Submit Question</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Join Us!</Link>
                        </li>
                    </ul>;
        }
        return (
        <div className="Layout">
            <nav id="mainNav" className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to="/"><span className="navbar-brand page-scroll">Would You Rather...</span></Link>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        { navbar }
                    </div>
                </div>
            </nav>

            <header>
            <div className="header-content">
                <div className="header-content-inner">
                { this.props.children }
                </div>
            </div>
            </header>
        </div>
        );
    }
});

module.exports = Application;