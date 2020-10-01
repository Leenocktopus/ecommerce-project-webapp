import React,{Component} from "react";
import "../../../css/login-window.css"
import {axiosSecurity} from "../../util/axiosConfig";
import {setAccessToken} from "../../redux/actions/tokenActions";
import {connect} from "react-redux";
import jwtDecode from "jwt-decode";
import {Link} from 'react-router-dom'
import {setUser} from "../../redux/actions/userActions";

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    onChange = (event)=>{
        const {name,value} = event.target
        this.setState({[name]:value})
    }

    onClick = async () =>{
        let token = await axiosSecurity.post("/login", this.state,)
            .then(response => response.data.token)
        this.props.setAccessToken(token)
        const {sub} = jwtDecode(token)
        console.log(token)
        await axiosSecurity.get(`/users/${sub}`, {headers: {
                authorization: `Bearer ${token}`
            }})
        .then(response => this.props.setUser(response.data))

    }



    render() {
        return (
            <div className={"login-field"}>
                <input type={"text"} name={"username"} value={this.state.username} onChange={this.onChange}/>
                <br/>
                <input type={"text"} name={"password"} value={this.state.password} onChange={this.onChange}/>
                <br/>
                <Link to={"/admin/main"}><button onClick={this.onClick}>Login</button></Link>
            </div>
        );
    }
}

export default connect(null, {setAccessToken, setUser})(Login)