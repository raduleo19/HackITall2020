import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "react-modal";
import { Provider } from 'react-redux';
import Reducer from './_reducers';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { loadState, saveState } from './localStorage'
import { BrowserRouter } from "react-router-dom";
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

Modal.setAppElement("#root");
const persistedState = loadState();

const store = createStoreWithMiddleware(
  Reducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe( () => {
  saveState({user:store.getState().user});
});


ReactDOM.render(
  <Provider
    store={store}
  >
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));