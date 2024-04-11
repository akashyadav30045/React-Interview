import React, { useEffect, useState,useRef, useCallback } from 'react'

const App = () => {
  const [news, setNews] = useState([]);
  const[loading,setloading] = useState(false)

  const[page,setPage] = useState(2);
  

  const loaderRef = useRef()


const fetchData = async(index) => {
  const url = `https://newsapi.org/v2/top-headlines?country=in&pageSize=9&page=${index}&apiKey=921aa27840b945e4b2c1a50937e64608`;

  const data = await fetch (url)
  const result = await data.json()
  console.log(result)
  return result;
}

const getData = useCallback ( async()=>{
  if(loading) return
  setloading(true)
  const data = await fetchData(page)
  setNews((prevNews) => (prevNews.length === 0 ? [...data] : [...prevNews, ...data]));
  setPage((page)=>page+1)
},[page,loading])
useEffect(()=>{
  const observer = new IntersectionObserver((entries)=>{
    const target = entries[0];
    if(target.isIntersecting){
      getData()
    }
  })
  if(loaderRef.current){
    observer.observe(loaderRef.current)
  }

  return () => {
    if(loaderRef.current){
      observer.unobserve(loaderRef.current)
    }
  }
},[getData])

const fetchimages = async() => {
  const data  = await fetchData(1)
  setNews(data)
}

  useEffect(()=>{
    fetchimages()
  },[])
  return (
    <div className='App'>
      <h1>News-App Infinite Scroll</h1>
      {
        news?.articles?.map((item,index)=>{
          return(
            <div className="main">
              <p style={{ fontSize: '40px', color:'purple', border:'3px solid black' }}> => {item.title}</p>
            </div>
          )
        })
      }
      <div ref={loaderRef}>

      </div>
    </div>
  )
}

export default App