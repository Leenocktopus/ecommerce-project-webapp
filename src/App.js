import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {axiosSecurity} from "./Component/util/axiosConfig";
import {connect} from "react-redux";
import {setAccessToken} from "./Component/redux/actions/tokenActions";

import ScrollToTop from "./Component/util/ScrollToTop";
import NotFound from "./Component/admin/Pages/NotFound";
import MainPage from "./Component/user/MainPage";
import LoggedOutRoute from "./Component/admin/LoggedOutRoute";
import LoggedInRoute from "./Component/admin/LoggedInRoute";
import AdminWindow from "./Component/admin/AdminWindow";
import Login from "./Component/admin/Pages/Login";

import "./css/admin/global.css";
import "./css/admin/admin-window.css";
import "./css/admin/menu.css";
import "./css/admin/not-found.css";
import "./css/admin/login-window.css";
import "./css/admin/settings-window.css"
import "./css/admin/modal.css"
import "./css/admin/image-modal.css"
import "./css/admin/page-specific.css"


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
                {!loading && <Switch>
                    <LoggedInRoute exact path={'/admin/login'} component={Login}/>
                    <LoggedOutRoute path={'/admin'} component={AdminWindow}/>
                    <Route path={'/'} component={MainPage}/>
                    <Route path={'*'} component={NotFound}/>
                </Switch>}
            </ScrollToTop>
        </Router>
    );
}
export default connect(null, {setAccessToken})(App);
