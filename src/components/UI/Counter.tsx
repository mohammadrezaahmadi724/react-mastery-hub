import React, { useState } from 'react';

// وظیفه: نمایش شمارنده تعاملی
// props:
// - initialValue: مقدار اولیه
// - step: اندازه گام
// قابلیت: افزایش، کاهش، بازنشانی

interface CounterProps {
  initialValue: number;
  step?: number;
}

const Counter: React.FC<CounterProps> = ({ initialValue, step = 1 }) => {
  const [count, setCount] = useState<number>(initialValue);

  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);
  const reset = () => setCount(initialValue);

  return (
    <div className="counter">
      <h3>شمارنده: {count}</h3>
      <div className="counter-controls">
        <button onClick={decrement} className="btn btn-danger">
          ➖ کاهش
        </button>
        <button onClick={reset} className="btn btn-secondary">
          🔄 بازنشانی
        </button>
        <button onClick={increment} className="btn btn-success">
          ➕ افزایش
        </button>
      </div>
      <div className="counter-info">
        <small>مقدار اولیه: {initialValue} | گام: {step}</small>
      </div>
    </div>
  );
};

export default Counter;