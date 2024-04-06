import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";

function App() {
  // State variables for principal, interest, years, and calculated EMI
  const [Principal, setPrincipal] = useState(0);
  const [Interest, setInterest] = useState(0);
  const [Years, setYears] = useState(0);
  const [calculate, setCalculate] = useState(0);

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const val = parseInt(e.target.value);
    const id = e.target.id;

    // Update respective state based on input field ID
    if (id === "principal") {
      setPrincipal(val);
    } else if (id === "interest") {
      setInterest(val);
    } else if (id === "Years") {
      setYears(val);
    }
  }

  // Function to calculate EMI
  const handleClick = () => {
    const P = Principal;
    const r = Interest / 12 / 100;
    const n = Years * 12;
    const calcPow = Math.pow(1 + r, n);
    const calculatedEMI = (P * r * calcPow) / (calcPow - 1);

    // Update calculated EMI state
    setCalculate(calculatedEMI.toFixed(2));
  }

  return (
    <div className="App">
      <div className="container">
        <h1>EMI Calculator</h1>
        <div className="inputs">
          <h2>Principal Loan Amount</h2>
          {/* Input field for principal */}
          <input type="text" placeholder="Principal" id="principal" onChange={handleChange} />
          <h2>Annual Interest Rate</h2>
          {/* Input field for interest rate */}
          <input type="text" placeholder="Interest" id="interest" onChange={handleChange} />
          <h2>Loan Term (in years)</h2>
          {/* Input field for loan term in years */}
          <input type="text" placeholder="Years" id="Years" onChange={handleChange} />
          <div>
            {/* Button to calculate EMI */}
            <button className="calculate" onClick={handleClick}>Calculate</button>
          </div>
          {/* Display calculated EMI */}
          <p>Your monthly EMI is {calculate}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
