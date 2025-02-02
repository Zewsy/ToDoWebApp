import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './app';
import {Provider} from 'react-redux';
import store from './store/index';

ReactDOM.render(
    <Provider store={store}>
         <BrowserRouter>  
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);