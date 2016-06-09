var React = require('react');
import _ from 'lodash';
import request from 'superagent';
import { getRandomPoll, getPollById } from '../../utils/utils';
import { Link } from 'react-router';
import Chart from '../chart.jsx';
import AddOptionButton from '../add_option_button.jsx';
import { getAuthenticated } from '../../stores/AppStateStore';


var buttonStyle={
    margin: 10,
};
var pStyle={
    marginBottom: 20,
}

var Question = React.createClass({
    getInitialState: function(){
        return ({poll: null,
                voted: false,
                addButtonActive: false,
                loading: false});
    },
    componentWillMount(){
        this.getNewPoll();
    },
    getNewPoll: function(flag){
        var self = this;
        this.setState({loading: true});
        if(_.hasIn(this.props,'params.id') && flag !== 'random'){
            getPollById(this.props.params.id, function(err, poll){
                if (err) return console.error('could not get a poll from database:', err);
                self.setState({poll: poll, voted: false, addButtonActive: false, loading: false});
            })
        } else {
            getRandomPoll(function(err, poll){
                if (err) return console.error('could not get a poll from database:', err);
                self.setState({poll: poll, voted: false, addButtonActive: false, loading: false});
            });
        }
    },
    handleClick: function(e){
        var option_id = e.target.id;
        var self = this;
        this.setState({loading: true});
        request
            .post('/api/poll/'+this.state.poll._id)
            .send({option_id:option_id})
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .end(function(err, res){
                if (err) return console.error('could not post vote to server:', err);
                self.setState({
                    poll: res.body,
                    voted: true,
                    loading: false
                });
            });
    },
    handleAddNewOption(text){
        if(!getAuthenticated()){
            document.getElementById('openLoginPrompt').click();
            return;
        }
        if(text.length < 1){
            document.getElementById('openBlankFieldsPrompt').click();
            return;
        }
        var option_id = "new";
        var option_text = text;
        var self = this;
        this.setState({loading: true});
        request
            .post('/api/poll/'+this.state.poll._id)
            .send({option_id:option_id, option_text:option_text})
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .end(function(err, res){
                if (err) return console.error('could not post vote to server:', err);
                self.setState({
                    poll: res.body,
                    voted: true,
                    loading: false
                });
            });
    },
    handleAddOptionActivate: function(){
        this.setState({addButtonActive: true});
    },
    render: function(){
        var spinner;
        var question;
        var options = [];
        var addOptionButtonMarkup;
        var chart;
        var noCenterClass = "";
        if(_.hasIn(this.state,'poll.question')){
            question = this.state.poll.question;
        }
        if(_.hasIn(this.state,'poll.options')){
            options = this.state.poll.options;
            if(options.length < 9) {
                addOptionButtonMarkup = <AddOptionButton handleAddNewOption={this.handleAddNewOption}
                                                         active = {this.state.addButtonActive}
                                                         clickHandle = {this.handleAddOptionActivate}
                                                             buttonStyle={buttonStyle}/>
            }
        }
        if(this.state.voted){
            chart = <Chart poll={this.state.poll}/>;
            options = [];
            addOptionButtonMarkup = null;
            noCenterClass = 'no-center';
        }
        if(this.state.loading){
            chart = null;
            spinner = <img src="/img/spinner.gif"></img>;
            options = [];
            question = '';
            addOptionButtonMarkup = null;
        }
        var self = this;
        return (
        <div className={"header-content "+noCenterClass}>
            <div className="header-content-inner">
                <div>
                    <button style={{display: 'none'}} id="openBlankFieldsPrompt" data-toggle="modal" data-target="#blankFieldsPrompt">
                        Invisible Blank Fields Prompt
                    </button>

                    <button style={{display: 'none'}} id="openLoginPrompt" data-toggle="modal" data-target="#loginPrompt">
                        Invisible Launch Login Prompt
                    </button>

                    <h1 style={{marginBottom: 20}}>Welcome to Vote'r!</h1>
                    <Link to='/' onClick={()=>{this.getNewPoll('random')}}>
                        <button className="btn btn-default">
                            <i className="fa fa-refresh" aria-hidden="true" />
                            Get New Question
                        </button>
                    </Link>
                    <hr />
                    {spinner}
                    <p style={pStyle}>{question}</p>
                    {chart}
                    {options.map(function(item){
                        return <a href='#'
                                  id={item._id}
                                  onClick={self.handleClick}
                                  style={buttonStyle}
                                  className="btn btn-primary btn-xl page-scroll"
                                  key={item._id}>{item.option}</a>
                    })}
                    {addOptionButtonMarkup}

                </div>
            </div>
        </div>
        );
    }
});

module.exports = Question;