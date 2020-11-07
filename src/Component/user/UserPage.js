import React from "react";
import {Route, Switch} from "react-router";
import ShopPage from "./ShopPage";
import Contacts from "./Contacts";
import Header from "./Header";
import Footer from "./Footer";
import MainPage from "./MainPage";
import NotFound from "../admin/Pages/NotFound";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";

const UserPage = () => {
    return (
        <>
            <Header/>
            <Switch>
                <Route exact path={`/`} component={MainPage}/>
                <Route exact path={`/shop`} component={ShopPage}/>
                <Route exact path={`/product/:id`} component={ProductPage}/>
                <Route exact path={`/contacts`} component={Contacts}/>
                <Route exact path={`/cart`} component={CartPage}/>
                <Route path={'*'} component={NotFound}/>
            </Switch>
            <Footer/>
        </>


    )
}
export default UserPage