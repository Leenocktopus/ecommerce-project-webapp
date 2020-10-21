import React from "react";
import {Link, NavLink} from "react-router-dom"
import {axiosSecurity} from "../util/axiosConfig";
import {setAccessToken} from "../redux/actions/tokenActions";
import {connect} from "react-redux";
import {setUser} from "../redux/actions/userActions";

const AdminMenu = ({user, setAccessToken, setUser, ...otherProps}) => {

    const logout = () => {
        axiosSecurity.get("/logout")
            .catch(error => {
                console.log(error)
            })

        setAccessToken("")
        setUser("")
    }

    return (
        <div className={"admin-menu"}>
            <div className={"banner"}>
                <Link to={"/admin/main"}><h1>Admin Panel</h1></Link>
                <h4>e&#8209;commerce project</h4>
                <hr/>
                {user && <>
                    <h3>Current user: </h3>
                    <h2><i className={"fa fa-user"}/> {user.username}</h2>
                </>}
                <hr/>
            </div>
            <ul>
                <li><NavLink activeClassName={"admin-active-menu-link"} to={"/admin/categories"}>Categories</NavLink>
                </li>
                <li><NavLink activeClassName={"admin-active-menu-link"}
                             to={"/admin/manufacturers"}>Manufacturers</NavLink></li>
                <li><NavLink activeClassName={"admin-active-menu-link"} to={"/admin/products"}>Products</NavLink></li>
                <li><NavLink activeClassName={"admin-active-menu-link"} to={"/admin/orders"}>Orders</NavLink></li>
                <li><NavLink activeClassName={"admin-active-menu-link"} to={"/admin/settings"}><span
                    className="glyphicon glyphicon-cog"/> Settings</NavLink></li>
                <li><NavLink activeClassName={"admin-active-menu-link"} to={"/admin/login"}>
                    <button className={"sneaky-button"} onClick={logout}><span
                        className="glyphicon glyphicon-log-out"/> Logout
                    </button>
                </NavLink></li>
            </ul>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        user: state.userState
    };
};
export default connect(mapStateToProps, {setAccessToken, setUser})(AdminMenu)