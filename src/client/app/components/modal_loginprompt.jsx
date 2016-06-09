var React = require('react');
import { Link } from 'react-router';

var textStyle = {
    color: '#333'
}
var LoginPrompt = React.createClass({
    closeModal: function(){
        document.getElementById("closeLogin").click();
    },
    render: function(){
        return (
    <div>
        <div className="modal fade" id="loginPrompt" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 style={textStyle} className="modal-title" id="myModalLabel">uh oh! ...</h4>
                    </div>
                    <div className="modal-body">
                        <p style={textStyle}>Please <Link onClick={this.closeModal} to="/login">login</Link> or <Link onClick={this.closeModal} to='/signup'>signup</Link> to submit content to Vote'r.</p>
                        <p style={textStyle}>Thanks for visiting the site!</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" id="closeLogin" className="btn btn-primary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        );
    }
});

/*
 <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
 Launch demo modal
 </button>
 */

module.exports = LoginPrompt;