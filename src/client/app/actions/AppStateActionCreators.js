var AppDispatcher = require('../dispatcher/AppDispatcher');

function setAppState(state){
    var action = {
        type: 'set_app_state',
        state: state
    };
    AppDispatcher.dispatch(action);
}
function setUser(user){
    var action = {
        type: 'set_user',
        user: user
    };
    AppDispatcher.dispatch(action);
}
function setAuthenticated(bool){
    var action = {
        type: 'set_authenticated',
        bool: bool
    };
    AppDispatcher.dispatch(action);
}

module.exports = {
    setAppState: setAppState,
    setUser: setUser,
    setAuthenticated: setAuthenticated
};