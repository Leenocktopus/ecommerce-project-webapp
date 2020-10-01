import React, {useState} from "react";
import {setUser} from "../../redux/actions/userActions";
import {connect} from "react-redux";

const Setting = ({user, ...otherProps}) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    return (
        <div>
            <input name={"firstName"} type={"text"} onChange={e => setFirstName(e.target.value)} value={firstName}/>
            <input name={"lastName"} type={"text"} onChange={e => setLastName(e.target.value)} value={lastName}/>
            <input name={"username"} type={"text"} onChange={e => setUsername(e.target.value)} value={username}/>
            <input name={"email"} type={"text"} onChange={e => setEmail(e.target.value)} value={email}/>
            <input name={"password"} type={"text"} onChange={e => setPassword(e.target.value)} value={password}/>
            <input name={"newPassword"} type={"text"} onChange={e => setNewPassword(e.target.value)}
                   value={newPassword}/>
            <input name={"repeatPassword"} type={"text"} onChange={e => setRepeatPassword(e.target.value)}
                   value={repeatPassword}/>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.userState
    };
}
export default connect(mapStateToProps, {setUser})(Setting)