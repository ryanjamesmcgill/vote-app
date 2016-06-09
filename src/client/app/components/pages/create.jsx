var React = require('react');
import OptionInput from '../optioninput.jsx';
import request from 'superagent';
import _ from 'lodash';
import { getAuthenticated } from '../../stores/AppStateStore';
import { browserHistory } from 'react-router';


var buttonStyle={
    margin: 5
};

var Create = React.createClass({
    getInitialState: function(){
        return ({
            question: '',
            options: [{idx:0,value: ''},{idx:1,value: ''}]
        });
    },
    addOption: function(e){
        e.preventDefault();
        var options = this.state.options;
        var idx = options.length;
        if(idx < 10) {
            options.push({idx:idx, value:''});
            this.setState({options: options});
        }
    },
    removeOption: function(e){
        e.preventDefault();
        if(this.state.options.length <= 2) return;
        var options = this.state.options;
        options.pop();
        this.setState({options: options});
    },
    handleChange: function(idx,e) {
        if(idx < 0){
            this.setState({question: e.target.value});
            return;
        }
        var options = this.state.options;
        options[idx].value = e.target.value;
        this.setState({options : options});
    },
    handleSubmit: function(e){
        e.preventDefault();

        if(!getAuthenticated()){
            document.getElementById('openLoginPrompt').click();
            return;
        }
        if(!this._validateForm()){
            document.getElementById('openBlankFieldsPrompt').click();
            return;
        }

        var question = this.state.question;
        var options = this.state.options;
        var optionsArray = [];
        _.forEach(options, function(option){
            optionsArray.push(option.value);
        });
        request
            .post('api/create/')
            .send({question:question, options: optionsArray})
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .end(function(err, res){
                if(err || !res.ok){
                    console.error('there was an error submitting form');
                }
                console.log('create');
                browserHistory.push('/poll/'+res.body.poll._id);
            });
    },
    _validateForm: function(){
        var validated = true;
        if(this.state.question.length < 1) validated = false;
        _.forEach(this.state.options, function(option){
            if(option.value.length < 1){
                validated = false;
            }
        });
        return validated;
    },
    render: function() {
        var removeButtonClass;
        if(this.state.options.length <= 2){
            removeButtonClass = 'disabled';
        }
        var options = this.state.options;
        var self = this;
        return (
    <div className="header-content no-center">
        <div className="header-content-inner">
            <div className="Create-container">

                <button style={{display: 'none'}} id="openBlankFieldsPrompt" data-toggle="modal" data-target="#blankFieldsPrompt">
                    Invisible Blank Fields Prompt
                </button>

                <button style={{display: 'none'}} id="openLoginPrompt" data-toggle="modal" data-target="#loginPrompt">
                    Invisible Launch Login Prompt
                </button>

                <h1 style={{marginBottom: 30}}>Create a question:</h1>
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label className="col-sm-2" for="exampleInputEmail1">Enter your question -></label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChange.bind(null,-1)} type="text" className="form-control" id="question" value={this.state.question} placeholder="Live in a castle, or own a yacht?" />
                        </div>
                    </div>
                    <hr />
                    {options.map(function(option){
                        return <OptionInput idx={option.idx} value={option.value} key={option.idx} handleChange={self.handleChange}/>
                    })}
                    <button style={buttonStyle} className="btn btn-default" onClick={this.addOption}><i className="fa fa-plus" aria-hidden="true"></i></button>
                    <button style={buttonStyle} className={"btn btn-default "+removeButtonClass} onClick={this.removeOption}><i className="fa fa-minus" aria-hidden="true"></i></button>
                    <button style={buttonStyle} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
        );
    }
});

module.exports = Create;