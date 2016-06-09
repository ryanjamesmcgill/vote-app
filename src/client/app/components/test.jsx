var React = require('react');


var Test = React.createClass({
    render: function(){
        return (
            <h1 style={{color:'#FFF'}}>testing {this.props.params.id}</h1>
        );
    }
});

module.exports = Test;