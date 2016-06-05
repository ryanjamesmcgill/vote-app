var React = require('react');

var buttonStyle={
    margin: 10,
};
var pStyle={
    marginBottom: 20,
}

var Question = React.createClass({
    render: function(){
        return (
        <div>
            <h1>Would you rather...</h1>
            <hr />
            <p style={pStyle}>Live in a castle, or own a yacht?</p>
            <a href="#" style={buttonStyle} className="btn btn-primary btn-xl page-scroll">Castle! Game of Thrown's ftw!</a>
            <a href="#" style={buttonStyle} className="btn btn-primary btn-xl page-scroll">Yacht, cause I cruise 8)</a>
        </div>
        );
    }
});

module.exports = Question;