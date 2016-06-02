var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var AppState = {
    greeting: ""
};

//setter functions here
function setAppState(state){
    AppState = assign({},state);
}
function setGreeting(message){
    AppState.greeting = message;
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
	}
});

function handleAction(action){
	switch (action.type) {
		case 'set_app_state':
			setAppState(action.state);
            emitChange();
            break;
		case 'set_greeting':
			setGreeting(action.message);
			emitChange();
			break;
		default: // .. do nothing
	}
}

AppStateStore.dispatchToken = AppDispatcher.register(handleAction);
module.exports = AppStateStore;