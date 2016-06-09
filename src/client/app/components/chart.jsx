var React = require('react');
import _ from 'lodash';


var Chart = React.createClass({
    componentDidMount: function(){
        var ChartJs = require('chart.js'); //including here because it won't run on server due to 'window' references
        var colors = ['#96ceb4','#ffeead','#ff6f69','#ffcc5c','#88d8b0','#d11141','#00b159','#00aedb','#f37735','#ffc425'];
        var options = this.props.poll.options;
        var labels = [];
        var data = [];
        var i = 0;
        _.forEach(options,function(option){
            labels.push(option.option);
            data.push(option.votes);
        });
        var data = {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: colors
                }]
        };
        var ctx = document.getElementById("myChart");
        var myDoughnutChart = new ChartJs(ctx, {
            type: 'horizontalBar',
            data: data,
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            min: 0,
                            stepSize: 1.0
                        }
                    }]
                }
            }
        });
    },
    render: function(){
        return (
            <div className="chart-container">
            <canvas id="myChart" style={{width:200,height: 200}}></canvas>
            </div>
        );
    }
});

module.exports = Chart;