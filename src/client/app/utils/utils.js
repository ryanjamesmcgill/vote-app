
import request from 'superagent';
import { setUser, setAuthenticated } from '../actions/AppStateActionCreators.js';
import { getAuthenticated } from '../stores/AppStateStore';

var checkAuthenticationAPI =  function(){
    request
        .get('/api/login')
        .end(function(err, res){
            if (err) return console.warn(err);
            if (res.body.user){
                setUser(res.body.user);
                setAuthenticated(true);
            } else {
                setUser(null);
                setAuthenticated(false);
            }
        });
};

var checkAuthenticationLocal = function(nextState, replace){
    console.log('checking authentication');
    if(!getAuthenticated()){
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });

    }
};

var getRandomPoll = function(cb){
    console.log('gettting random question');
    request
        .get('/api/poll/random')
        .end(function(err,res){
            if(err) return cb(err);
            console.log('poll returned:',res.body);
            return cb(null, res.body);
        });
};

var getPollById = function(id, cb){
    console.log('getPollById:', id);
    request
        .get('/api/poll/'+id)
        .end(function(err, res){
            if(err) return cb(err);
            console.log('poll returned:', res.body);
            return cb(null, res.body);
        });
}

var echo = function(msg){
    console.log('echo():', msg);
}

module.exports = {
    checkAuthenticationAPI: checkAuthenticationAPI,
    checkAuthenticationLocal: checkAuthenticationLocal,
    getRandomPoll: getRandomPoll,
    getPollById: getPollById,
    echo: echo
};