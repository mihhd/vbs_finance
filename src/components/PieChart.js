import React, {Component} from 'react';
import {Pie} from "react-chartjs-2";
import axios from "axios";
import Select from "react-select";
import PieChartStats from "./PieChartStats";


class PieChart extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.state = {
            selectedOption: "",
            selectYears: [
                {value:"2019", label:"2019" },
                {value:"2018", label:"2018" },
                {value:"2017", label:"2017" },
                {value:"2016", label:"2016" },
                {value:"2015", label:"2015" },
                {value:"2014", label:"2014" },
                {value:"2013", label:"2013" },
                {value:"2012", label:"2012" },
                {value:"2011", label:"2011" },
                {value:"2010", label:"2010" },
                {value:"2009", label:"2009" },
                {value:"2008", label:"2008" },
                {value:"2007", label:"2007" },
                {value:"2006", label:"2006" },
                {value:"2005", label:"2005" },
                {value:"2004", label:"2004" },
                {value:"2003", label:"2003" },
                {value:"2002", label:"2002" },
                {value:"2001", label:"2001" },
                {value:"2000", label:"2000" },
            ],

        }
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
            <div className="row">
                <div className="col-2">
                    <h6>Select Year</h6>
                    <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={this.state.selectYears}
                    />
                </div>

                <div className="col-10">
                    <h3>Funding Groups By Year</h3>
                    <hr/>
                    <div className="row">
                        <div className="col-6" style={{marginTop: "25px"}}>
                            <h6>Original Principal Amount</h6>
                            <PieChartStats selectedOption={this.state.selectedOption} statistics={"original"}/>
                        </div>
                        <div className="col-6" style={{marginTop: "25px"}}>
                            <h6>Repaid Data To IDA</h6>
                            <PieChartStats selectedOption={this.state.selectedOption} statistics={"repaid"}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6" style={{marginTop: "25px"}}>
                            <h6>Disbursed Amount</h6>
                            <PieChartStats selectedOption={this.state.selectedOption} statistics={"disbursed"}/>
                        </div>
                        <div className="col-6" style={{marginTop: "25px"}}>
                            <h6>Undisbursed Amount</h6>
                            <PieChartStats selectedOption={this.state.selectedOption} statistics={"undisbursed"}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PieChart;