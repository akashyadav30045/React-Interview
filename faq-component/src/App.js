import logo from './logo.svg';
import './App.css';
import React, { useState } from "react"

function App() {
  const[isOpen,setisOpen] = useState(false)
  const data=[
    {
      question: "How many bones does a cat have?",
      answer: "A cat has 230 bones - 6 more than a human",
    },
    {
      question: "How much do cats sleep?",
      answer: "The average cat sleeps 12-16 hours per day",
    },
    {
      question: "How long do cats live",
      answer: "Outdoor cats live 5 years on average. Indoor\ncats live 15 years on average.",
    },
  ]
  const handleClick = () => {
    setisOpen(!isOpen)
  }
  return (
    <div className="App">
      {
        data.map((index,key)=>{
          return (
            <>
            <h1>{index.question}</h1>
            {isOpen && 
              <h2>{index.answer}</h2>
            }
            <button onClick={handleClick}>Close</button>
            
            </>
           

        )})
      }
    </div>
  );
}

export default App;
