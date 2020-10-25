import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './store/root';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { appHistory } from './history';
import { fetchProfileInfo } from './store/profile';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware() //.concat(logger),
})

store.dispatch(fetchProfileInfo())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={appHistory}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);