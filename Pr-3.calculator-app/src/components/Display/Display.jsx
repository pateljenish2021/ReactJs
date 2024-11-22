import React from 'react';
import './Display.css';

const Display = ({ calculation, result }) => {
  return (
    <div className="display">
      <div className="calculation">{calculation}</div>
      <div className="result">{result || ''}</div>
    </div>
  );
};

export default Display;