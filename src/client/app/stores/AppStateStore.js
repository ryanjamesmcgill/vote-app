var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
import request from 'superagent';
import _ from 'lodash';
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var AppState = {
    user: {},
	userPolls: [],
    authenticated: false,
};

//setter functions here
function setAppState(state){
    AppState = assign({},state);
}
function setUser(user){
    AppState.user = user;
	AppState.userPolls = []; //clear polls from previous user
	_.forEach(user.polls,function(poll_id){
		console.log('calling getPollById', poll_id);
		request
			.get('/api/poll/'+poll_id)
			.end(function(err, res){
				if(err) return console.error(err);
				addUserPoll(res.body)
			});
	});
}
function addUserPoll(poll){
	AppState.userPolls.push(poll);
}
function setAuthenticated(bool){
    AppState.authenticated = bool;
}
function emitChange(){
	AppStateStore.emit(CHANGE_EVENT);
}

var AppStateStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback){
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback);
	},
	getAppState: function(){
		return AppState;
	},
    getUser: function(){
        return AppState.user;
    },
	getUserPolls: function(){
		return AppState.userPolls;
	},
    getAuthenticated: function(){
        return AppState.authenticated;
    }
});

function handleAction(action){
	switch (action.type) {
		case 'set_app_state':
			setAppState(action.state);
            emitChange();
            break;
        case 'set_user':
			setUser(action.user);
			emitChange();
			break;
		case 'set_authenticated':
			setAuthenticated(action.bool);
			emitChange();
			break;
		default: // .. do nothing
	}
}

AppStateStore.dispatchToken = AppDispatcher.register(handleAction);
module.exports = AppStateStore;