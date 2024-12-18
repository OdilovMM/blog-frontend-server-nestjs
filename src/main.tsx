import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './indexcopy.css';
import './index.css';
import App from './App.tsx';
import { closeSnackbar, SnackbarProvider } from 'notistack';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
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
    </Provider>
  </>
);
