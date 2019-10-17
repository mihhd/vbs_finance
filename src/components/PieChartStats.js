import React, {Component} from 'react';
import {Pie} from "react-chartjs-2";
import axios from "axios";


class PieChartStats extends Component{

    constructor(props) {
        super(props);

        this.fetchInfo = this.fetchInfo.bind(this);
        this.state = {

            labels: ['Under 1B', 'Between 1B And 10B', 'More Than 10B'],
            datasets: [{
                data: [],
                backgroundColor: [ 'Green', 'Blue', 'Red' ]
            }]
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.selectedOption!=="" && prevProps.selectedOption !== this.props.selectedOption)
            this.fetchInfo();
    }


    componentDidMount() {
        if(this.props.selectedOption !== "")
            this.fetchInfo();
    }

    async fetchInfo(){

        let url = "https://finances.worldbank.org/resource/tdwh-3krx.json?$query=SELECT country, sum(original_principal_amount), sum(repaid_to_ida), sum(disbursed_amount), sum(undisbursed_amount) WHERE effective_date_most_recent_ BETWEEN '"+ (parseInt(this.props.selectedOption.value) - 1).toString() +"' AND '"+ this.props.selectedOption.value  +"' GROUP BY country";
        await axios.get(url)
            .then(res => {
                const fullInfo = res.data;

                let under = [];
                let between = [];
                let more = [];

                if(this.props.statistics === "original"){
                    under = fullInfo.filter(sum => sum.sum_original_principal_amount < 1000000000);
                    between = fullInfo.filter(sum => (sum.sum_original_principal_amount >= 1000000000) && (sum.sum_original_principal_amount <= 10000000000));
                    more = fullInfo.filter(sum => sum.sum_original_principal_amount > 10000000000);
                }
                else if(this.props.statistics === "repaid"){
                    under = fullInfo.filter(sum => sum.sum_repaid_to_ida < 1000000000);
                    between = fullInfo.filter(sum => (sum.sum_repaid_to_ida >= 1000000000) && (sum.sum_repaid_to_ida <= 10000000000));
                    more = fullInfo.filter(sum => sum.sum_repaid_to_ida > 10000000000);
                }
                else if(this.props.statistics === "disbursed"){
                    under = fullInfo.filter(sum => sum.sum_disbursed_amount < 1000000000);
                    between = fullInfo.filter(sum => (sum.sum_disbursed_amount >= 1000000000) && (sum.sum_disbursed_amount <= 10000000000));
                    more = fullInfo.filter(sum => sum.sum_disbursed_amount > 10000000000);
                }
                else if(this.props.statistics === "undisbursed"){
                    under = fullInfo.filter(sum => sum.sum_undisbursed_amount < 1000000000);
                    between = fullInfo.filter(sum => (sum.sum_undisbursed_amount >= 1000000000) && (sum.sum_undisbursed_amount <= 10000000000));
                    more = fullInfo.filter(sum => sum.sum_undisbursed_amount > 10000000000);
                }


                let datasets = this.state.datasets;
                datasets[0].data = [under.length, between.length, more.length];

                this.setState({
                    datasets: datasets
                })
            });
    }

    render() {
        return (
            <div>
                <Pie
                    data={{
                        labels: this.state.labels,
                        datasets: this.state.datasets
                    }}
                />
            </div>
        );
    }
}

export default PieChartStats;