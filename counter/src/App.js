import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";

function App() {
  const [isShow, setisShow] = useState(false);
  const [hours, setHours] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const[Paused,setPaused] = useState(false)
  const[tid,setTid] = useState(0);

  const ClickHandler = () => {
    setisShow(!isShow);
    
    
  };

  const handleinput = (e) => {
    const val = parseInt(e.target.value);
    const clas = e.target.className;
    if (clas === "hours") {
      setHours(val);
    }
    if (clas === "seconds") {
      setSeconds(val);
    }
    if (clas === "minutes") {
      setMinutes(val);
    }
  
  };

  const resetButton = () => {
    setHours(0)
    setMinutes(0)
    setSeconds(0)
  }


  

  const handleReduce = (hours,seconds,minutes) => {


    //checking for second
    if (seconds > 0 ) {
      setSeconds((s) => s - 1);
    }
    else if(seconds>60){
      setMinutes((m)=>m+1)
      setSeconds((s)=>s-60)
    }
    else if ( minutes > 0 && minutes>60) {
      setMinutes((m) => m - 1);
      setSeconds(59);
      setHours((h)=>h+1)
    }
    else if ( hours > 0) {
      setHours((h) => h - 1);
      setMinutes(59);
      setSeconds(59);
    }

  };

  useEffect(() => {
    let tid;
    if (isShow) {
      tid = setInterval(() => {
        handleReduce(hours,seconds,minutes);
      }, 1000);
      setTid(tid)
      console.log(tid)
    }

  
 
    return () => clearInterval(tid);// Clear interval on component unmount
  }, [isShow, hours, seconds, minutes]);


  const Pause = () => {
    clearInterval(tid)
    setPaused(true)
  }
  const Resume = () => {
    handleReduce(hours,seconds,minutes)
    setPaused(false)
  }

  return (
    <div className="App">
      <h1 className="heading">Countdown Timer</h1>
      <div className="input-boxes">
        <input type="text" className="hours" onChange={handleinput} placeholder="HH" />
        <input type="text" className="minutes" onChange={handleinput}  placeholder="MM" />
        <input type="text" className="seconds" onChange={handleinput} placeholder="SS" />
      </div>
      <div className="Start-Btn" onClick={ClickHandler}>
        <button className="start">Start</button>
      </div>

      {/* div shown on start */}
      {isShow && (
        <div>
          <div className="show">
            <div className="count">{hours}</div>
            <span>:</span>
            <div className="count">{minutes}</div>
            <span>:</span>
            <div className="count">{seconds}</div>
          </div>

          <div>

            <button className="Pause" onClick={Pause}>Pause</button>
            <button className="Reset" onClick={Resume} >Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
