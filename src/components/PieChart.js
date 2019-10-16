import React, {Component} from 'react';
import {Pie} from "react-chartjs-2";
import axios from "axios";
import Select from "react-select";


class PieChart extends Component {
    constructor(props) {
        super(props);

        this.fetchInfo = this.fetchInfo.bind(this);
        this.state = {
            selectedOption: "",
            selectYears: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"],
            labels: ['Under 1,000,000,000', 'Between 1,000,000,000 And 20,000,000,000', 'More Than 20,000,000,000'],
            datasets: [{
                data: [],
                backgroundColor: ['Blue', 'Red', 'Green']
            }]
        }
    }

    componentDidMount() {
        this.fetchInfo();
    }

    async fetchInfo(){

        let url = "https://finances.worldbank.org/resource/tdwh-3krx.json?$query=SELECT country, sum(original_principal_amount), sum(repaid_to_ida), sum(disbursed_amount), sum(undisbursed_amount) WHERE effective_date_most_recent_ BETWEEN '2010' AND '2011' GROUP BY country";
        await axios.get(url)
            .then(res => {
                const fullInfo = res.data;

                let under = fullInfo.filter(sum => sum.sum_original_principal_amount < 1000000000);
                let between = fullInfo.filter(sum => (sum.sum_original_principal_amount > 1000000000) && (sum.sum_original_principal_amount < 20000000000));
                let more = fullInfo.filter(sum => sum.sum_original_principal_amount > 20000000000);


                console.log(fullInfo.length);
                console.log(under.length);
                console.log(between.length);
                console.log(more.length);

                let datasets = this.state.datasets;
                datasets[0].data = [under.length, between.length, more.length];

                this.setState({
                    datasets: datasets
                })
            });
    }


    handleChange = selectedOption => {
        this.setState(
            { selectedOption },
            () => console.log(`Option selected:`, this.state.selectedOption)
        );
    };

    render() {
        const { selectedOption } = this.state;
        return (
            <div>
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={this.state.selectYears}
                />
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

export default PieChart;