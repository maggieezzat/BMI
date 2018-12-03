import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import reducer from '../src/store/reducers/reducer';
import thunk from 'redux-thunk';

// import {store, persistor} from './store/configureStore';
// import { PersistGate } from 'redux-persist/integration/react'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer , composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store = {store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
        <App />
    {/* </PersistGate> */}
    </Provider>

)

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
