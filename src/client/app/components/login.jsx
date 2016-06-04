var React = require('react');
var AppStateStore = require('../stores/AppStateStore');

var Login = React.createClass({
    render: function() {
        var user = this.props.user;
        return (
            <div>
                <h2>Please Login:</h2>
                <p><i>Don't have a login? <a href="/signup">Sign Up Here!</a></i></p>
                <form action="/login" method="post">
                    <input type="text" placeholder="enter a username" name="username"/>
                    <input type="password" placeholder="enter a password" name="password"/>
                    <button type="submit">login</button>
                </form>
                <a href="/auth/facebook">login with facebook</a><br/>
                <a href="/auth/twitter">login with twitter</a><br/>
                <a href="/auth/google">login with google</a><br/>
            </div>
        );
    }
});

module.exports = Login;

