import React from 'react';
import {Route} from "react-router-dom";
import Categories from "./Categories";
import Manufacturers from "./Manufacturers";
import "../../css/admin-panel.css";
import AdminMenu from "./AdminMenu";
import Products from "./Products";
import Orders from "./Orders";
import Users from "./Users";
import MainContent from "./MainContent";
import Login from "./Login";
import Settings from "./Settings";


const AdminWindow = ({match}) =>(

    <>
    <div>
        <AdminMenu/>
        <div className={"admin-main-grid"}>
            <div className={"admin-main-content"}>
                <Route exact path={`${match.url}/categories`} component={Categories}/>
                <Route exact path={`${match.url}/manufacturers`} component={Manufacturers}/>
                <Route exact path={`${match.url}/products`} component={Products}/>
                <Route exact path={`${match.url}/orders`} component={Orders}/>
                <Route exact path={`${match.url}/users`} component={Users}/>
                <Route exact path={`${match.url}/settings`} component={Settings}/>
                <Route exact path={`${match.url}/main`} component={MainContent}/>
            </div>
        </div>
    </div>

    </>
)
export default AdminWindow