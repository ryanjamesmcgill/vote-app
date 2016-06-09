var React = require('react');
import AppStateStore from '../stores/AppStateStore';
import { Link } from 'react-router';

var UserPolls = React.createClass({
    render: function() {
        var userPolls = AppStateStore.getUserPolls();
        return (
            <div>
                <h2>Your Polls:</h2>
                    <div className="list-group">
                    {userPolls.map(function(poll){
                        return <Link key={poll._id} className="list-group-item" to={"/poll/"+poll._id}>
                                    {poll.question}
                                </Link>
                    })}
                    </div>
            </div>
        );
    }
});

module.exports = UserPolls;