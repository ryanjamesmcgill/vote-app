
import request from 'superagent';
import { setUser, setAuthenticated } from '../actions/AppStateActionCreators.js';

var checkAuthentication =  function(){
    request
        .get('/api/login')
        .end(function(err, res){
            if (err) console.error(err);
            if (res.body.user){
                setUser(res.body.user);
                setAuthenticated(true);
            } else {
                setUser(null);
                setAuthenticated(false);
            }
        });
};

var logoutUser = function(){
    request
        .get('/api/logout')
        .end(function(err, res){
            if (err) console.error(err);
            setUser(null);
            setAuthenticated(false);
        });
};

module.exports = {
    checkAuthentication: checkAuthentication,
    logoutUser: logoutUser,
};