import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Landing from './Landing';
import Pictures from './Pictures';
import Profiles from './Profiles';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Landing />
    <Pictures />
    <Profiles />
  </React.StrictMode>
);
// above between React.StrictMode code, Put: <Landing />  <Pictures /> and <Profiles /> back in

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
