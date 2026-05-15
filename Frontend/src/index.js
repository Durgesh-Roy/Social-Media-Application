import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './auth/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ChakraProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();