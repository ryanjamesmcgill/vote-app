var React = require('react');


var OptionInput = React.createClass({
    render: function() {
        var idx = this.props.idx;
        var value = this.props.value
        var handleChange = this.props.handleChange;
        return (
            <div className="form-group">
                <label className="col-sm-2" for="exampleInputPassword1">{'Option '+String(idx+1)}</label>
                <div className="col-sm-10">
                    <input type="text"
                           onChange={handleChange.bind(null,idx)}
                           className="form-control"
                           value={value}
                           id={'option'+idx}
                           placeholder={"Enter option " + String(idx+1)} />
                </div>
            </div>
        );
    }
});

module.exports = OptionInput;