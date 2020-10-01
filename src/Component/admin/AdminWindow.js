import React from 'react';
import {Route, Switch} from "react-router-dom";
import Categories from "./Pages/Categories";
import Manufacturers from "./Pages/Manufacturers";
import "../../css/admin-panel.css";
import AdminMenu from "./AdminMenu";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import Users from "./Pages/Users";
import MainContent from "./Pages/MainContent";
import Settings from "./Pages/Settings";
import NotFound from "./Pages/NotFound";


const AdminWindow = ({match}) =>(

    <>
    <div>
        <AdminMenu/>
        <div className={"admin-main-grid"}>
            <div className={"admin-main-content"}>
                <Switch>
                    <Route exact path={`${match.url}/categories`} component={Categories}/>
                    <Route exact path={`${match.url}/manufacturers`} component={Manufacturers}/>
                    <Route exact path={`${match.url}/products`} component={Products}/>
                    <Route exact path={`${match.url}/orders`} component={Orders}/>
                    <Route exact path={`${match.url}/users`} component={Users}/>
                    <Route exact path={`${match.url}/settings`} component={Settings}/>
                    <Route exact path={`${match.url}/main`} component={MainContent}/>
                    <Route path={"*"} component={NotFound}/> {/*Maybe change to another*/}
                </Switch>
            </div>
        </div>
    </div>

    </>
)
export default AdminWindow