import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import GlobalStyles from './Component/GlobalStyles';
import reportWebVitals from './reportWebVitals';
import { persistor, store } from './services/redux/store';
const theme = createTheme();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
  <React.StrictMode>
      <GlobalStyles>
      <ThemeProvider theme={theme}>
      <Toaster/>
        <App />
      </ThemeProvider>
      </GlobalStyles>
   </React.StrictMode>
   </PersistGate>
   </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
