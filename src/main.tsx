import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { closeSnackbar, SnackbarProvider } from 'notistack';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider
      maxSnack={8}
      autoHideDuration={10000}
      action={(snackbarId) => (
        <a href="#" onClick={() => closeSnackbar(snackbarId)}>
          Dismiss
        </a>
      )}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  </StrictMode>
);
