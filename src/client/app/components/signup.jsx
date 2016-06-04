var React = require('react');
var AppStateStore = require('../stores/AppStateStore');

var SignUp = React.createClass({
    render: function() {
        var user = this.props.user;
        return (
            <div>
                <h2>Please Sign Up:</h2>
                <form action="/signup" method="post">
                    <input type="text" placeholder="enter username" name="username"/>
                    <input type="password" placeholder="enter password" name="password"/>
                    <button type="submit">Sign Me Up!</button>
                </form>
                <a href="/auth/facebook">sign up with facebook</a><br/>
                <a href="/auth/twitter">sign up with twitter</a><br/>
                <a href="/auth/google">sign up with google</a><br/>
            </div>
        );
    }
});

module.exports = SignUp;
