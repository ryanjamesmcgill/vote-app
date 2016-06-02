var AppDispatcher = require('../dispatcher/AppDispatcher');

function setGreeting(message){
    var action = {
        type: 'set_greeting',
        message: message
    };
    AppDispatcher.dispatch(action);
}
function setAppState(state){
    var action = {
        type: 'set_app_state',
        state: state
    };
    AppDispatcher.dispatch(action);
}

module.exports = {
	setGreeting: setGreeting,
    setAppState: setAppState
};