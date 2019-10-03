import React from 'react';
import './App.css';
import Countries from "./components/Countries";

function App() {
  return (
    <div className="App">
        <div className={"container"} style={{width: "500px", margin: "auto"}}>
            <Countries/>
        </div>
    </div>
  );
}

export default App;
