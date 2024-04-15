import React, { useEffect, useState, useRef, useCallback } from 'react';

const App = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loaderRef = useRef();

  const fetchData = async (index) => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&pageSize=9&page=${index}&apiKey=921aa27840b945e4b2c1a50937e64608`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const getData = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const data = await fetchData(page);
    if (data.articles) {
      setNews((prevNews) => [...prevNews, ...data.articles]);
      setPage((prevPage) => prevPage + 1);
    }
    setLoading(false);
  }, [page, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        getData();
      }
    }, { threshold: 0.5 });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [getData, loading]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='App'>
      <h1>News-App Infinite Scroll</h1>
      {news.map((item, index) => (
        <div className='main' key={index}>
          <p style={{ fontSize: '40px', color: 'purple', border: '3px solid black' }}> => {item.title}</p>
        </div>
      ))}
      <div ref={loaderRef}>
        {loading && <h1>Loading</h1>}
      </div>
    </div>
  );
};

export default App;
