import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const middlewares = [thunk, logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
, document.getElementById('root'));

