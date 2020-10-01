import React,{Component} from "react";
import {setUser} from "../../redux/actions/userActions";
import {connect} from "react-redux";


class Settings extends Component{
    constructor(props) {
        super(props);
        this.state = {
            firstName: props.user.firstName,
            lastName: props.user.lastName,
            username: props.user.username,
            email: props.user.email,
            password: "",
            newPassword: "",
            repeatPassword: ""
        }
    }

    onChange = (event) =>{
        const {name, value} = event.target;
        this.setState({[name]:value})
    }

    render() {
        return (
            <div>
                <input name={"firstName"} type={"text"} onChange={this.onChange} value={this.state.firstName}/>
                <input name={"lastName"} type={"text"} onChange={this.onChange} value={this.state.lastName}/>
                <input name={"username"} type={"text"} onChange={this.onChange} value={this.state.username}/>
                <input name={"email"} type={"text"} onChange={this.onChange} value={this.state.email}/>
                <input name={"password"} type={"text"} onChange={this.onChange} value={this.state.password}/>
                <input name={"newPassword"} type={"text"} onChange={this.onChange} value={this.state.newPassword}/>
                <input name={"repeatPassword"} type={"text"} onChange={this.onChange} value={this.state.repeatPassword}/>
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return {
        user: state.userState
    };
}
export default connect(mapStateToProps, {setUser})(Settings)