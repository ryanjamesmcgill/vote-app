var React = require('react');
import AppStateStore from '../stores/AppStateStore';
import _ from 'lodash';

var UserDefault = React.createClass({
    render: function() {
        var user = AppStateStore.getUser();
        var name = _.get(user,'local.username') ||
                    _.get(user,'facebook.displayName') ||
                    _.get(user, 'twitter.displayName') ||
                    _.get(user, 'google.displayName');
        var login;
        switch(true){
            case _.hasIn(user, 'local'):
                //display password changing functions
                login='logged in locally';
                break;
            case _.hasIn(user, 'facebook'):
                login='logged in with facebook';
                break;
            case _.hasIn(user, 'twitter'):
                login='logged in with twitter';
                break;
            case _.hasIn(user, 'google'):
                login='logged in with google';
                break;
            default:
                login='did not detect your login..?';
                //default?
        }
        return (
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{login}</li>
            </ul>
        );
    }
});

module.exports = UserDefault;