import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root_react');
const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App />);