import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {axiosSecurity} from "./Component/util/axiosConfig";
import {connect} from "react-redux";
import {setAccessToken} from "./Component/redux/actions/tokenActions";

import ScrollToTop from "./Component/util/ScrollToTop";
import NotFound from "./Component/admin/Pages/NotFound";
import LoggedOutRoute from "./Component/admin/LoggedOutRoute";
import LoggedInRoute from "./Component/admin/LoggedInRoute";
import AdminWindow from "./Component/admin/AdminWindow";
import Login from "./Component/admin/Pages/Login";
import UserPage from "./Component/user/UserPage";
import Loading from "./Component/util/Loading";

import "./styles/admin/global.css";
import "./styles/admin/admin-window.css";
import "./styles/admin/menu.css";
import "./styles/admin/not-found.css";
import "./styles/admin/login-window.css";
import "./styles/admin/settings-window.css"
import "./styles/admin/modal.css"
import "./styles/admin/image-modal.css"
import "./styles/admin/page-specific.css"
import "./styles/admin/loading.css"
import "./styles/user/header.css"
import "./styles/user/main-page.css"
import "./styles/user/contacts.css"
import "./styles/user/shop-page.css"
import "./styles/user/product-card.css"
import "./styles/user/star-rating.css"
import "./styles/user/product-page.css"

const App = ({setAccessToken, ...otherProps}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecurity.get("/refresh")
            .then(response => response.data.token)
            .then(token => setAccessToken(token))
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
    }, [setAccessToken])

    return (
        <Router>
            <ScrollToTop>
                {!loading ? <Switch>
                    <LoggedInRoute exact path={'/admin/login'} component={Login}/>
                    <LoggedOutRoute path={'/admin'} component={AdminWindow}/>
                    <Route path={'/'} component={UserPage}/>
                    <Route path={'*'} component={NotFound}/>
                </Switch> : <Loading/>}
            </ScrollToTop>
        </Router>
    );
}
export default connect(null, {setAccessToken})(App);
