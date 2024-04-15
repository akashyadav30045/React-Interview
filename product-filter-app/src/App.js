import { useEffect, useState } from 'react';
import './App.css';
import { items } from './items';
//  ['Bags', 'Watches', 'Sports', 'Sunglasses']
function App() {
  const filters = ['Bags', 'Watches', 'Sports', 'Sunglasses'];
  const [filteredData, setFilteredData] = useState(items)
  const [activeFilters, setActiveFilters] = useState([]);

  const handleFilterClick = (e) => {
    const products = e.target.id
    if(activeFilters.includes(products)){
      const temp = activeFilters.filter((ele)=> ele !== products);
      setActiveFilters(temp)
    }
    else{
      setActiveFilters([...activeFilters,products])
    }
  }

  const FilterProducts = () => {
    if(activeFilters.length){
      const temp2 = items.filter((ele) => activeFilters.includes(ele.category) )
      setFilteredData(temp2)
    }
    else{
      setFilteredData(items);
    }
  }
  useEffect(()=>{
    FilterProducts()
  },[activeFilters])


  return (
    <div className="App">
      <div className='filters'
        onClick={handleFilterClick}
      >
        {
          filters.map((item, idx) => (
            <button
              className={activeFilters.includes(item) ? 'selected' : ''}
              key={idx}
              id={item}
            >{item}</button>
          ))
        }
      </div>

      <div className='product-list'>
        {
          filteredData.map((item, idx) => (
            <div className='item' key={idx}>
              <p>{item.name}</p>
              <p className='category'>{item.category}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App