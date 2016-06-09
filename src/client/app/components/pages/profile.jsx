var React = require('react');
import UserTable from '../usertable.jsx';
import UserDefault from '../userdefault.jsx';
import UserPolls from '../userpolls.jsx';


var Profile = React.createClass({
    getInitialState: function(){
        return ({
            showTable: false
        });
    },
    _flipView: function(){
        var showTable = this.state.showTable;
        this.setState({showTable: !showTable});
    },
    render: function() {
        var content;
        var buttonText;
        if(this.state.showTable){
            content = <UserTable />;
            buttonText = 'less detailed view';
        } else {
            content = <UserDefault />;
            buttonText = 'more detailed view';

        }
        return (
    <div className="header-content no-center">
        <div className="header-content-inner">
            <div className="Profile-container">
                <h1 style={{marginBottom: 10}}>My Profile:</h1>
                <button style={{marginBottom: 10}} onClick={this._flipView} className="btn btn-primary">{buttonText}</button>
                {content}
                <UserPolls />
            </div>
        </div>
    </div>
        );
    }
});

module.exports = Profile;