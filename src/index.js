import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from "axios";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Redux/Store';
import { BrowserRouter as Router } from 'react-router-dom'; 

axios.defaults.baseURL = "http://localhost:8000";

// Chemin de base pour les images
const BASE_IMAGE_URL = "http://localhost:8000/";

// Fonction pour obtenir le chemin complet de l'image
export function getImageUrl(imagePath) {
    return BASE_IMAGE_URL + imagePath;
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </PersistGate>
  </Provider>
);

reportWebVitals();
