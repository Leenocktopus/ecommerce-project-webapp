import axios from "axios";
import jwtDecode from "jwt-decode";
import store from "../redux/store";
import {setAccessToken} from "../redux/actions/tokenActions";

axios.defaults.headers.post['Content-Type'] = 'application/json';
export var axiosAPI = axios.create({
    baseURL: "http://localhost:8080/api/v1"
})
const {dispatch} = store

axiosAPI.interceptors.request.use(async (config) => {
    let token = store.getState().tokenState.token;

    if (!token) {
        return config
    }

    const {exp} = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
        token = await axiosSecurity.get("/refresh")
            .then(response => response.data)
            .then(data => data.token)
        dispatch(setAccessToken(token))
    }
    config.headers.post["Authorization"] = `Bearer ${token}`

    return config;
}, error => {
    console.log(error);
    return Promise.reject(error);
});


export var axiosSecurity = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json'
    }
})



