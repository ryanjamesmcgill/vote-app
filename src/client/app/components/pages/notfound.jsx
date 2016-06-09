var React = require('react');


var NotFound = React.createClass({
    render: function(){
        return (
    <div className="header-content">
        <div className="header-content-inner">
            <h1 style={{color:'#F2F2F2'}}>404 Not Found</h1>
        </div>
    </div>
        );
    }
});

module.exports = NotFound;