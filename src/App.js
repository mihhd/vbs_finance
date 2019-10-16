import React from 'react';
import './App.css';
import Countries from "./components/Countries";

import 'jquery/dist/jquery.min';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

function App() {
  return (
    <div className="App">
        <div className="container" style={{paddingTop: "20px"}}>
            <Countries/>
        </div>
    </div>
  );
}

export default App;
