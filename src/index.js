import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080";
//axios.defaults.headers.common
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use((response) => {
    console.log(response.data);
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);

});

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
