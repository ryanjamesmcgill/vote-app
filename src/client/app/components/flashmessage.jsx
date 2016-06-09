var React = require('react');

var styleError = {
    borderRadius: 5,
    border: '1px solid #5C0000',
    backgroundColor: '#FFC1C1',
    color: '#CD0000',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 20
};
var styleSuccess = {
    borderRadius: 5,
    border: '1px solid #007B0A',
    backgroundColor: '#E1F8D3',
    color: '#006A00',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 20
};

var FlashMessage = React.createClass({
    /*
    * props.show -> if true, flash will show
    * props.time -> optional, ms of length of show, defaults to 3000
     */
    render: function() {
        var type = this.props.type || 'error';
        var style;
        switch(type){
            case 'error':
                style = styleError;
                break;
            case 'success':
                style = styleSuccess;
                break;
            default:
                console.asser(false, 'invalid type given to FlashMessage component. type:', type);
        }

        if(this.props.visible){
            return (
                    <p style={style}>{this.props.message}</p>
            );
        } else {
            return <p style={{display: 'none'}}></p>;
        }

    }
});

module.exports = FlashMessage;