import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";


const Header = ({cart}) => {
    return (
        <div className={"nav-bar"}>
            <div className={"nav-bar-logo"}>eShop</div>
            <div className={"nav-bar-item"}><NavLink activeClassName={"nav-bar-item-active"} exact
                                                     to={"/"}>HOME</NavLink></div>
            <div className={"nav-bar-item"}><NavLink activeClassName={"nav-bar-item-active"} exact
                                                     to={"/shop"}>SHOP</NavLink></div>
            <div className={"nav-bar-item"}><NavLink activeClassName={"nav-bar-item-active"} exact
                                                     to={"/contacts"}>CONTACTS</NavLink></div>
            <div className={"nav-bar-item"}><NavLink activeClassName={"nav-bar-item-active"} exact
                                                     to={"/cart"}>CART ({cart.length})</NavLink></div>
        </div>)
}
const mapStateToProps = state => {
    return {
        cart: state.cartState.cartItems
    };
};
export default connect(mapStateToProps, null)(Header)