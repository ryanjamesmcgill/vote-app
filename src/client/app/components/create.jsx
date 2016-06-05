var React = require('react');


var Create = React.createClass({
    render: function() {
        return (
            <div className="Create-container">
                <h1 style={{marginBottom: 30}}>Create a question:</h1>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-2" for="exampleInputEmail1">Would you rather...</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="Question" placeholder="Live in a castle, or own a yacht?" />
                        </div>
                    </div>
                    <hr />
                    <div className="form-group">
                        <label className="col-sm-2" for="exampleInputPassword1">Option 1</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="option1" placeholder="Castle! Game of Thrown's ftw!" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2" for="exampleInputPassword1">Option 2</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="option2" placeholder="Yacht, cause I cruise 8)" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        );
    }
});

module.exports = Create;