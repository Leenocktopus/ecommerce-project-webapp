import React, {Component} from 'react';

import './App.css';

import Header from "./Component/Header";
import Footer from "./Component/Footer";
import MainPage from "./Component/Pages/MainPage";
import ServicePage from "./Component/Pages/ServicePage";
import ShopPage from "./Component/Pages/ShopPage";
import ContactsPage from "./Component/Pages/ContcatsPage";
import AboutPage from "./Component/Pages/AboutPage";
import CartPage from "./Component/Pages/CartPage";
import PageNotFound from "./Component/Pages/PageNotFound";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import ProductPage from "./Component/Pages/ProductPage";
import SuccessPage from "./Component/Pages/SuccessPage";
import {Provider} from "react-redux";
import store from "./Component/redux/store";
import ScrollToTop from "./Component/util/ScrollToTop";

class App extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            cartItems: []
        };
    }


    render() {
        return (
            <Provider store={store}>
                <Router>
                    <ScrollToTop>

                        <Header cartItems/>
                        <Switch>
                            <Route exact path={'/'} component={MainPage}/>
                            <Route exact path={'/service'} component={ServicePage}/>
                            <Route exact path={'/shop'} component={ShopPage}/>
                            <Route exact path={'/contacts'} component={ContactsPage}/>
                            <Route exact path={'/about'} component={AboutPage}/>
                            <Route exact path={'/cart'} component={CartPage}/>
                            <Route exact path={'/product/:id'} component={ProductPage}/>
                            <Route exact path={'/order/success'} component={() => <SuccessPage
                                message={"Дякуємо за замовлення, очікуйте дзвінка оператора."}/>}/>
                            <Route exact path={'/request/success'} component={() => <SuccessPage
                                message={"Наші співробітники якнайшвидше зв'яжуться з вами, очікуйте."}/>}/>
                            <Route exact path={'/404'} component={PageNotFound}/>
                            <Redirect to="/404"/>
                        </Switch>
                        <Footer/>
                    </ScrollToTop>
                </Router>
            </Provider>
        );
    }
}

export default App;
