import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';

class Countries extends Component {

    constructor(props) {
        super(props);

        this.fetchCountries = this.fetchCountries.bind(this);
        this.state = {
            selectedOption: null,
            countries: [],
            selectCountries: []
        }
    }

    componentWillMount() {

        this.fetchCountries();
    }

    async fetchCountries(){
        await axios.get("http://api.worldbank.org/v2/country/?format=json&per_page=1000")
            .then(res => {
                const c = res.data[1];

                let selectCountry = c.map(country =>{
                    let select = {};
                    select.value = country.name;
                    select.label = country.name;
                    return select;
                });
                this.setState({ countries: c, selectCountries: selectCountry});
            })
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
                <div className="col-12">
                    <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={this.state.selectCountries}
                    />
                </div>
            </div>
        )
    }
}

export default Countries;