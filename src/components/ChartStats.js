import React, { Component } from 'react';
import axios from 'axios';

import 'jquery/dist/jquery.min';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import {Line} from "react-chartjs-2";

class ChartStats extends Component{
    constructor(props) {
        super(props);

        this.fetchStats = this.fetchStats.bind(this);

        this.state = {
            countryName: this.props.countryName,
            fullStats: {},

            dataLine: {
                labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00"],
                datasets: [
                    {
                        label: "Credits held",

                        fill: true,
                        hidden:false,
                        datasetStroke: false,
                        lineTension: 0.3,
                        backgroundColor: "rgba(255,0,0,0.3)",
                        borderColor: "rgb(255, 0, 0)",
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointBorderColor: "rgb(205, 130,1 58)",
                        pointBackgroundColor: "rgb(255, 255, 255)",
                        pointBorderWidth: 10,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgb(0, 0, 0)",
                        pointHoverBorderColor: "rgba(220, 220, 220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: []
                    },
                    {
                        label: "Undisbursed amount",

                        fill: true,
                        hidden:false,
                        datasetStroke: false,
                        lineTension: 0.3,
                        backgroundColor: "rgba(0,255,0,0.3)",
                        borderColor: "rgb(0,255,0)",
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointBorderColor: "rgb(205, 130,1 58)",
                        pointBackgroundColor: "rgb(255, 255, 255)",
                        pointBorderWidth: 10,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgb(0, 0, 0)",
                        pointHoverBorderColor: "rgba(220, 220, 220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: []
                    },
                    {
                        label: "Disbursed amount",

                        fill: true,
                        hidden:false,
                        datasetStroke: false,
                        lineTension: 0.3,
                        backgroundColor: "rgba(0,0,255,0.3)",
                        borderColor: "rgb(0,0,255)",
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointBorderColor: "rgb(205, 130,1 58)",
                        pointBackgroundColor: "rgb(255, 255, 255)",
                        pointBorderWidth: 10,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgb(0, 0, 0)",
                        pointHoverBorderColor: "rgba(220, 220, 220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: []
                    },
                ]
            },
            options:{
                responsive: true,
                legend: {
                    onClick: function(e, legendItem) {
                        let index = legendItem.datasetIndex;
                        let ci = this.chart;

                        ci.data.datasets.forEach(function(e, i) {
                            let meta = ci.getDatasetMeta(i);

                            meta.hidden = i !== index;

                        });

                        ci.update();
                    },
                },
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("props");
        console.log(this.props.countryName);

        if(this.props.countryName !== prevProps.countryName){
            console.log("razlicni se");
            this.fetchStats();
        }

    }

    componentDidMount() {
        this.fetchStats();
    }

    async fetchStats(){

        let url = "https://finances.worldbank.org/resource/tdwh-3krx.json?$query=SELECT distinct credit_number, country, undisbursed_amount, disbursed_amount, credits_held, effective_date_most_recent_ " +
            "WHERE effective_date_most_recent_ BETWEEN '1980' AND '2019' " +
            "AND country='"+ this.props.countryName + "' ORDER BY effective_date_most_recent_ DESC";
        await axios.get(url)
            .then(res => {
                const fullStats = res.data;

                this.setState({
                    fullStats: fullStats
                });
                console.log("full Stats");
                console.log(this.state.fullStats);

                this.orderData();
            });
    }

    orderData() {
        let byYear = [];
        for (let i = 0; i < this.state.fullStats.length; i++) {
            var full = this.state.fullStats[i];
            var year = byYear.find(y => {
                var dFull = new Date(full.effective_date_most_recent_);
                var dYear = new Date(y.effective_date_most_recent_);
                return dYear.getFullYear() === dFull.getFullYear()
            });
            if (year == null) {
                byYear.push(Object.assign({}, full))
            }
            else {
                year.undisbursed_amount = parseFloat(year.undisbursed_amount) + parseFloat(full.undisbursed_amount)
                year.disbursed_amount = parseFloat(year.disbursed_amount) + parseFloat(full.disbursed_amount)
                year.credits_held = parseFloat(year.credits_held) + parseFloat(full.credits_held)
            }
        }
        console.log(byYear);

        let legendData = [];

        byYear.forEach(item => {
           legendData.push(item.effective_date_most_recent_.toString().substr(0, 4));
        });

        let creditsHeld = byYear.map((item)=>{return item.credits_held});
        let undisbursedAmount = byYear.map((item)=>{return item.undisbursed_amount});
        let disbursedAmount = byYear.map((item)=>{return item.disbursed_amount});

        let dataLine = this.state.dataLine;

        dataLine.labels = legendData;
        dataLine.datasets[0].data = creditsHeld;
        dataLine.datasets[1].data = undisbursedAmount;
        dataLine.datasets[2].data = disbursedAmount;

        this.setState({
            dataLine: dataLine
        });

    }

    render() {
        return (
            <div>
                {this.props.countryName}
                <Line data={this.state.dataLine} height={150} />
            </div>
        );
    }
}

export default ChartStats;