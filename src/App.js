import React from 'react';
import './App.css';
import Countries from "./components/Countries";

import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap';
import PieChart from "./components/PieChart";

function App() {
  return (
    <div className="App">
        <div className="container" style={{paddingTop: "20px"}}>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" href="#ChartStats" role="tab" data-toggle="tab">Usage of funds</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#Pie" role="tab" data-toggle="tab">Funding groups</a>
                </li>
            </ul>

            <div className="tab-content" style={{paddingTop: "50px"}}>
                <div role="tabpanel" className="tab-pane fade in active" id="ChartStats" style={{opacity:1}}>
                    <Countries/>
                </div>
                <div role="tabpanel" className="tab-pane fade" id="Pie">
                    <PieChart/>
                </div>
            </div>

        </div>
    </div>
  );
}

export default App;
