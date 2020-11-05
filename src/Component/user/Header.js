import React, {Component} from "react";
import {NavLink} from "react-router-dom";


class Header extends Component {
    render() {
        return (
            <div className={"nav-bar"}>
                <div className={"nav-bar-logo"}>eShop</div>
                <div className={"nav-bar-item"}><NavLink activeClassName={"nav-bar-item-active"} exact to={"/"}>Home</NavLink></div>
                <div className={"nav-bar-item"}><NavLink activeClassName={"nav-bar-item-active"} exact to={"/products"}>Shop</NavLink></div>
                <div className={"nav-bar-item"}><NavLink activeClassName={"nav-bar-item-active"} exact to={"/contacts"}>Contacts</NavLink></div>
            </div>
        );
    }
}

export default Header