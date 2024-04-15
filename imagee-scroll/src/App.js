import logo from './logo.svg';
import './App.css';
import React from "react";
import {useEffect,useState} from "react";


function App() {

  const [images,setImages ] = useState([])
  const[index,setIndex] = useState(0)


  const fetchApi = async() => {
    const url = `https://www.reddit.com/r/aww/top/.json?t=all`
    const data = await fetch(url)
    const result = await data.json()
    const res = result.data.children;
    const  list = res.filter((item)=>item.data.url_overridden_by_dest.includes(".jpg")).map((item)=>item.data.url_overridden_by_dest)
    console.log(list);
    setImages(list)
  }

  const handleChange = (e) =>{
    const val = e.target.className;
    const lastIdx = images.length -1;
    console.log(lastIdx)
    if(val==="Next"){
      setIndex((i)=>i<lastIdx?i+1:0)
    }
    if(val==="Prev"){
      setIndex((i)=>i===0?lastIdx:i-1)
    }
  }

  useEffect(()=>{
    const tid = setTimeout(() => {
      setIndex((i)=>i<7?i+1:0)
    }, 2000);
    return () =>{
      clearInterval(tid)
    }
  },[index])



  useEffect(() => {
    fetchApi()
  }, [])
  
  return (
    <div className="App">
      <div className="main">
        <button className="Prev" onClick={handleChange} style={{border:"2px solid black ", padding:10,borderRadius:5,cursor:'pointer'}}>
          Prev
        </button>
        {
          <img  style={{height:500,width:500, margin:30}}src={images[index]} alt="" />

        }
        <button className="Next" onClick={handleChange}  style={{border:"2px solid black ", padding:10,borderRadius:5,cursor:'pointer'}}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
