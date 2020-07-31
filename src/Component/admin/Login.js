import React,{Component} from "react";
import "../../css/login-window.css"


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

    onClick = () =>{
        //TODO
        this.props.history.push("/admin/main")
    }



    render() {
        return (
            <div className={"login-field"}>
                <input type={"text"} name={"username"} value={this.state.username} onChange={this.onChange}/>
                <br/>
                <input type={"text"} name={"password"} value={this.state.password} onChange={this.onChange}/>
                <br/>
                <button onClick={this.onClick}>Login</button>
            </div>
        );
    }
}

export default Login