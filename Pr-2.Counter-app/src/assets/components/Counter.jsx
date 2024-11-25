import React, { useState } from 'react';
import './Counter.css';

function Counter() {

  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);

  const decrement = () => {
    if (count === 0) {
      alert("Value cannot go below 0");
    } else {
      setCount(count - 1);
    }
  };

  return (
    <div className="counter">
      <button onClick={decrement} className="btn decrement-btn">
        _
      </button>
      <span className="count">{count}</span>
      <button onClick={increment} className="btn increment-btn">
        +
      </button>
      {/* <p id="zero">Value cannot go below 0</p> */}
    </div>
  );
}

export default Counter;