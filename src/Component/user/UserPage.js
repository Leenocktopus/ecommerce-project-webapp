import React from "react";
import {Route, Switch} from "react-router";
import ShopPage from "./ShopPage";
import AboutAndContacts from "./AboutAndContacts";
import Header from "./Header";
import Footer from "./Footer";
import MainPage from "./MainPage";
import NotFound from "../admin/Pages/NotFound";

const UserPage = ({match, history}) => {
    console.log(match.url)
    console.log(history)
    return (
        <>
            <Header/>
            <Switch>
                <Route exact path={`/`} component={MainPage}/>
                <Route exact path={`/products`} component={ShopPage}/>
                <Route exact path={`/contacts`} component={AboutAndContacts}/>
                <Route path={'*'} component={NotFound}/>
            </Switch>
            <Footer/>
        </>


    )
}
export default UserPage