var React = require('react');

var iconStyle={
    fontSize: 52,
    margin: 10,
};

var Signup = React.createClass({
    render: function() {
        return (
            <div className="Signup-container">
                <h1 style={{marginBottom: 10}}>Sign Up:</h1>
                <p style={{marginBottom:0}}>Sign in with your favorite social profile</p>
                <a href="/auth/twitter"><i style={iconStyle} className="fa fa-twitter-square" aria-hidden="true"></i></a>
                <a href="/auth/facebook"><i style={iconStyle} className="fa fa-facebook-square" aria-hidden="true"></i></a>
                <a href="/auth/google"><i style={iconStyle} className="fa fa-google-plus-square" aria-hidden="true"></i></a>
                <hr />
                <p style={{marginBottom:30}}>Or create a new account here</p>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-2" for="exampleInputEmail1">Username</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Username" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2" for="exampleInputPassword1">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2" for="exampleInputPassword1">Confirm</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password Confirm" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        );
    }
});

module.exports = Signup;