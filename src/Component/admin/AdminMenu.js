import React, {Component} from "react";
import {Link,NavLink} from "react-router-dom"
import {axiosSecurity} from "../util/axiosConfig";
import {setAccessToken} from "../redux/actions/tokenActions";
import {connect} from "react-redux";
import {setUser} from "../redux/actions/userActions";

class AdminMenu extends Component {
    constructor(props, context) {
        super(props, context);
    }

    onClick = () =>{
        axiosSecurity.get("/logout")
            .catch(error => {
                console.log(error)
            })

        this.props.setAccessToken("")
        this.props.setUser("")
    }

    render() {

        return (
            <div className={"admin-menu"}>
                <div className={"banner"}>
                    <Link to={"/admin/main"}><h1>Admin Panel</h1></Link>
                    <h4>e&#8209;commerce project</h4>
                    <hr/>
                    { this.props.user && <>
                        <h3>{this.props.user.firstName + " "+ this.props.user.lastName}</h3>
                        <h3>{this.props.user.username}</h3>
                        <h5>{this.props.user.email}</h5>
                    </>}
                    <hr/>
                </div>
                <ul>
                    <li><NavLink activeClassName={"admin-active-menu-link"} to={"/admin/categories"}>Categories</NavLink></li>
                    <li><NavLink activeClassName={"admin-active-menu-link"} to={"/admin/manufacturers"}>Manufacturers</NavLink></li>
                    <li><NavLink activeClassName={"admin-active-menu-link"} to={"/admin/products"}>Products</NavLink></li>
                    <li><NavLink activeClassName={"admin-active-menu-link"} to={"/admin/orders"}>Orders</NavLink></li>
                    <li><NavLink activeClassName={"admin-active-menu-link"} to={"/admin/users"}>Users</NavLink></li>
                    <li><NavLink activeClassName={"admin-active-menu-link"} to={"/admin/settings"}><span className="glyphicon glyphicon-cog"/> Settings</NavLink></li>
                    <li><NavLink activeClassName={"admin-active-menu-link"} to={"/admin/login"}>
                        <button className={"sneaky-button"} onClick={this.onClick}><span className="glyphicon glyphicon-log-out"/> Logout
                        </button>
                    </NavLink></li>
                </ul>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        user: state.userState
    };
};
export default connect(mapStateToProps, {setAccessToken, setUser})(AdminMenu)