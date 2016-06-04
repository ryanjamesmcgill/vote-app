var React = require('react');
var AppStateStore = require('../stores/AppStateStore');

var UserInfo = React.createClass({
    render: function() {
        var user = this.props.user;
        return (
        <p>{JSON.stringify(user)}</p>
        );
    }
});

module.exports = UserInfo;

