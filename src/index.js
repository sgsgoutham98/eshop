import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store'; 
import { AlertProvider } from './components/CustomAlert/alertContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AlertProvider>
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
  </AlertProvider>
);


reportWebVitals();
