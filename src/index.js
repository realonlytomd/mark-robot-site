import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Landing from './Landing';
import Pictures from './Pictures';
import Profiles from './Profiles';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Landing />
    <Pictures />
    <Profiles />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
