import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Improved error handler
const originalError = console.error;
console.error = (...args) => {
  if (/ResizeObserver|ResizeObserver loop limit exceeded/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);