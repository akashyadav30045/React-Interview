import { useState } from 'react';
import './App.css';

function App() {
  const list =   [1, 2, 3, 4, 5,6,7,8]
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  console.log('rating ', rating);
  console.log('hover ', hover);
  console.log('((rating && hover) || hover) ',
    ((rating && hover) || hover))
  return (
    <div className="App">
      <h1>Star Ratings</h1>
      <div>
        {
       list.map((num) => (
            <button
              key={num}
              onClick={() => setRating(num)}
              onMouseOver={() => setHover(num)}
              onMouseLeave={() => setHover(rating)}
            >
              <span
                className={//5<=5
                  `star ${num <= ((rating && hover) || hover)
                    ? 'on' : 'off'
                  }`
                }
              >&#9733;</span>
            </button>
          ))
        }
      </div>
    </div >
  );
}

export default App;