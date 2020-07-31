import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080/api/v1";
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

serviceWorker.unregister();
