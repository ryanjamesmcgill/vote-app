var React = require('react');
var AppStateStore = require('../stores/AppStateStore');
import { Link } from 'react-router';

var Application = React.createClass({
    render: function() {
        console.log('rendering app');
        return (
            <div>
                <h1>Would You Rather... ?</h1>
                <ul role="nav">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                </ul>
                {this.props.children}
            </div>);
    }
});

module.exports = Application;