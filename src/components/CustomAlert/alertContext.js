// alertContext.js
import React, { useState, createContext, useCallback } from 'react';
import CustomAlert from './CustomAlertComponent';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  const showAlert = useCallback((message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  }, []);

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      <CustomAlert 
        open={alertOpen} 
        handleClose={handleAlertClose} 
        message={alertMessage} 
        severity={alertSeverity} 
      />
    </AlertContext.Provider>
  );
};
