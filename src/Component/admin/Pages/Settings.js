import React, {useState} from "react";
import {setUser} from "../../redux/actions/userActions";
import {connect} from "react-redux";
import "../../../css/settings-window.css";
import {axiosSecurity} from "../../util/axiosConfig";
import jwtDecode from "jwt-decode";
import {setAccessToken} from "../../redux/actions/tokenActions";

const Setting = ({user, setUser, token, history}) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");


    const [profileError, setProfileError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    var url = `/users/${jwtDecode(token)["sub"]}`;
    const changePassword = () => {
        console.log(history)
        if (newPassword === repeatPassword) {
            axiosSecurity.put(`${url}/password?old=${password}`, {
                    password: newPassword
                }, config
            ).then(() => setAccessToken(""))
                .then(() => window.location.reload(false))
                .catch(() => setPasswordError("Password is not correct"))
        } else {
            setPasswordError("Passwords don't match")
        }

    }
    const changeEmail = () => {
        setEmailError("")
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase())) {
            axiosSecurity.put(`${url}/email`, {
                    email
                }, config
            ).then(response => setUser(response.data))
                .catch(() => setUsernameError("Email is already in use"))
        } else {
            setEmailError("Malformed email")
        }

    }
    const changeUsername = () => {
        setUsernameError("")
        axiosSecurity.put(`${url}/username`, {
                username
            }, config
        ).then(response => setUser(response.data))
            .then(() => window.location.reload(false))
            .catch(() => setUsernameError("Username is already taken"))
    }

    const changeProfile = () => {
        setProfileError("")
        axiosSecurity.put(`${url}/profile`, {
                firstName,
                lastName
            }, config
        ).then(response => setUser(response.data))
            .catch(() => setUsernameError("Value is too long for 'name' fields"))
    }

    return (
        <div id={"settings-container"}>
            <div className={"section-heading"}>Profile</div>
            <div>
                <div className={"labels"}>First name</div>
                <input className={"settings-input"} name={"firstName"} type={"text"}
                       onChange={e => setFirstName(e.target.value)} value={firstName} autoComplete="off"/>
            </div>
            <div>
                <div className={"labels"}>Last name</div>
                <input className={"settings-input"} name={"lastName"} type={"text"}
                       onChange={e => setLastName(e.target.value)} value={lastName} autoComplete="off"/>
            </div>
            <button className={"settings-button"} onClick={changeProfile}>Save profile</button>
            <span className={"settings-error"}>{profileError && profileError}</span>
            <div>
                <div className={"section-heading"}>Username</div>
                <div className={"labels"}>Username</div>
                <input className={"settings-input"} name={"username"} type={"text"}
                       onChange={e => setUsername(e.target.value)} value={username} autoComplete="off"/>
            </div>
            <button className={"settings-button"} onClick={changeUsername}>Change username</button>
            <span className={"settings-error"}>{usernameError && usernameError}</span>
            <div>
                <div className={"section-heading"}>Email</div>
                <div className={"labels"}>Email</div>
                <input className={"settings-input"} name={"email"} type={"text"}
                       onChange={e => setEmail(e.target.value)} value={email} autoComplete="off"/>
            </div>
            <button className={"settings-button"} onClick={changeEmail}>Change email</button>
            <span className={"settings-error"}>{emailError && emailError}</span>
            <div>
                <div className={"section-heading"}>Password</div>
                <div className={"labels"}>Password</div>
                <input className={"settings-input"} name={"password"} type={"password"}
                       onChange={e => setPassword(e.target.value)} value={password} autoComplete="off"/>
            </div>
            <div>
                <div className={"labels"}>New password</div>
                <input className={"settings-input"} name={"newPassword"} type={"password"}
                       onChange={e => setNewPassword(e.target.value)}
                       value={newPassword} autoComplete="off"/>
            </div>
            <div>
                <div className={"labels"}>Repeat password</div>
                <input className={"settings-input"} name={"repeatPassword"} type={"password"}
                       onChange={e => setRepeatPassword(e.target.value)}
                       value={repeatPassword} autoComplete="off"/>
            </div>
            <button className={"settings-button"} onClick={changePassword}>Change password</button>
            <span className={"settings-error"}>{passwordError && passwordError}</span>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.userState,
        token: state.tokenState.token
    };
}
export default connect(mapStateToProps, {setUser, setAccessToken})(Setting)