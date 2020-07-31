import React, {Component} from 'react';


import {BrowserRouter as Router, /*Redirect,*/ Route, Switch} from 'react-router-dom';
/*import {Provider} from "react-redux";
import store from "./Component/redux/store";*/
import ScrollToTop from "./Component/util/ScrollToTop";
import Footer from "./Component/admin/Footer";
import Header from "./Component/admin/Header";
import MainContent from "./Component/admin/MainContent";
import AdminWindow from "./Component/admin/AdminWindow";
import "./css/global.css";
import Login from "./Component/admin/Login";
class App extends Component {


    render() {
        return (
            /*<Provider store={store}>*/
                <Router>
                    <ScrollToTop>
                        <Header/>
                        <Switch>
                            <Route exact path={`/admin/login`} component={Login}/>
                            <Route path={'/admin'} component={AdminWindow}/>
                        </Switch>
                        <Footer/>
                    </ScrollToTop>
                </Router>
            /*</Provider>*/
        );
    }
}

export default App;
