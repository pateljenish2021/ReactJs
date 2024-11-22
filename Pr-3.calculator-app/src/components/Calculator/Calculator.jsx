import React, { useState } from 'react';
import Display from '../Display/Display';
import Button from '../Button/Button';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (value) => {
    if (value === 'AC') {
      setInput('');
      setResult('');
    } 
    else if (value === '⌫') {
      setInput((prev) => prev.slice(0, -1));
    } 
    else if (value === '+/-') {
      setInput((prev) => (prev.startsWith('-') ? prev.slice(1) : `-${prev}`));
    } 
    else if (value === '=') {
      try {
        const evaluated = eval(input.replace('×', '*').replace('÷', '/'));
        setResult(evaluated.toString());
      } 
      catch {
        setResult('Error');
      }
    } 
    else {
      setInput((prev) => (prev === 'Error' ? value : prev + value));
    }
  };

  const buttons = [
    ['⌫', '+/-', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['AC', '0', '.', '='],
  ];

  return (
    <div className="calculator">
      {/* Display */}
      <Display calculation={input || '0'} result={result} />
      <div className="buttons">
        {buttons.map((row, rowIndex) => (
          <div key={rowIndex} className="button-row">
            {row.map((btn) => (
              <Button key={btn} value={btn} onClick={() => handleInput(btn)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;