import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from "axios";

import App from './App';
import reportWebVitals from './reportWebVitals';
import Store from './Redux/Store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'; 
const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL="http://localhost:8000"

root.render(
  <Provider store={Store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>
);

reportWebVitals();
