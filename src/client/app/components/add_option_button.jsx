var React = require('react');


var AddOptionButton = React.createClass({
    getInitialState: function(){
        return ({
            text: ''
        });
    },
    handleChange:function(e){
        var value = e.target.value;
        this.setState({text: value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.handleAddNewOption(this.state.text);
    },
    render: function(){
        var interiorMarkup;
        var clickClass = ""
        if(this.props.active){
            interiorMarkup =
                <div>
                    <input style={{marginBottom:10}}
                           className="form-control"
                            value={this.state.text}
                            onChange={this.handleChange}
                            placeholder="enter custom option"/>
                    <button onClick={this.handleSubmit} className="btn btn-default">submit</button>
                </div>;
            clickClass = "non-clickable";
        } else {
            interiorMarkup = <i className="fa fa-plus" aria-hidden="true" />;
            clickClass = "clickable";
        }
        return (
            <a href='#'
               style={this.props.buttonStyle}
               onClick={this.props.clickHandle}
               className={"btn btn-primary btn-xl page-scroll "+clickClass}>
                {interiorMarkup}
            </a>
        );
    }
});

module.exports = AddOptionButton;