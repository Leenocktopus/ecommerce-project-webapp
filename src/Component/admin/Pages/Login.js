import React, {useState} from "react";
import "../../../css/login-window.css"
import {axiosSecurity} from "../../util/axiosConfig";
import {setAccessToken} from "../../redux/actions/tokenActions";
import {connect} from "react-redux";
import jwtDecode from "jwt-decode";
import {setUser} from "../../redux/actions/userActions";


const Login = ({setUser, setAccessToken, history, ...otherProps}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [failed, setFailed] = useState(false);

    const login = () => {
        axiosSecurity.post("/login", {username, password},)
            .then(response => response.data.token)
            .then(token => {
                setAccessToken(token)
                return token
            }).then(token => axiosSecurity.get(`/users/${jwtDecode(token)["sub"]}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => setUser(response.data)))
            .then(() => history.push("/admin/main"))
            .catch(() => setFailed(true));

    }
    return (
        <div id={"login-wrapper"}>
            <div id={"login-form"}>
                <div id="login-header">
                    Sign in
                </div>
                <div id={"login-body"}>
                    {failed ? <div className={"text-danger"}>Password or login was not correct</div> :
                        <div>&nbsp;</div>}
                    <input type={"text"}
                           name={"username"}
                           value={username}
                           onChange={e => setUsername(e.target.value)}
                           placeholder={"Username"}
                           className={"login-element"}/>
                    <br/>
                    <input type={"password"}
                           name={"password"}
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                           placeholder={"Password"}
                           className={"login-element"}/>
                    <br/>
                    <button onClick={login} className={"login-element"}>Login</button>
                </div>
            </div>
        </div>

    );

}

export default connect(null, {setAccessToken, setUser})(Login)