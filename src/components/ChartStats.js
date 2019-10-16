import React, { Component } from 'react';
import axios from 'axios';

import 'jquery/dist/jquery.min';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

class ChartStats extends Component{
    constructor(props) {
        super(props);

        this.fetchStats = this.fetchStats.bind(this);

        this.state = {
            countryName: this.props.countryName,
            fullStats: {}
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
            });
    }

    render() {
        return (
            <div>
                {this.props.countryName}
            </div>
        );
    }
}

export default ChartStats;