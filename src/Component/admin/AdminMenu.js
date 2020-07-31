import React from "react";
import {Link,NavLink} from "react-router-dom"

const AdminMenu = () =>(
    <div className={"admin-menu"}>
        <div className={"banner"}>
            <Link activeClassName={"admin-active-menu-link"} to={"/admin/main"}><h1>Admin Panel</h1></Link>
            <h4>e-commerce project</h4>
        </div>
        <ul>
            <li><NavLink activeClassName={"admin-active-menu-link"} to={"/admin/categories"}>Categories</NavLink></li>
            <li><NavLink activeClassName={"admin-active-menu-link"} to={"/admin/manufacturers"}>Manufacturers</NavLink></li>
            <li><NavLink activeClassName={"admin-active-menu-link"} to={"/admin/products"}>Products</NavLink></li>
            <li><NavLink activeClassName={"admin-active-menu-link"} to={"/admin/orders"}>Orders</NavLink></li>
            <li><NavLink activeClassName={"admin-active-menu-link"} to={"/admin/users"}>Users</NavLink></li>
            <li><NavLink activeClassName={"admin-active-menu-link"} to={"/admin/settings"}><span className="glyphicon glyphicon-cog"/> Settings</NavLink></li>
            <li><NavLink activeClassName={"admin-active-menu-link"} to={"/admin/login"}><span className="glyphicon glyphicon-log-out"/> Logout</NavLink></li>
        </ul>
    </div>
)
export default AdminMenu