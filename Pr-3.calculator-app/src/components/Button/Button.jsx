import React from 'react';
import './Button.css';

const Button = ({ value, onClick }) => {
  const isOperator = ['÷', '×', '-', '+', '='].includes(value);
  const isSpecial = ['AC', '+/-', '%', '⌫'].includes(value);
  const isBackspace = value === '⌫';

  return (
    <button className={`button ${isOperator ? 'operator' : ''} ${isSpecial ? 'special' : ''} ${isBackspace ? 'backspace' : ''}`}
      onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;