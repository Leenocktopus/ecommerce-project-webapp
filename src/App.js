import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ScrollToTop from "./Component/util/ScrollToTop";

import AdminWindow from "./Component/admin/AdminWindow";
import "./css/global.css";
import Login from "./Component/admin/Pages/Login";

import AdminRoute from "./Component/admin/LoggedOutRoute";
import {axiosSecurity} from "./Component/util/axiosConfig";
import {connect} from "react-redux";
import {setAccessToken} from "./Component/redux/actions/tokenActions";
import PlebRoute from "./Component/admin/LoggedInRoute";
import NotFound from "./Component/admin/Pages/NotFound";
import MainPage from "./Component/user/MainPage";

const App = ({setAccessToken, ...otherProps}) => {
    const [loading, setLoading] = useState();

    useEffect(() => {
            axiosSecurity.get("/refresh")
                .then(response => response.data.token)
                .then(
                    token => {
                        setAccessToken(token)
                        setLoading(false)
                    }
                ).catch(() => setLoading(false))
        }
        , [setAccessToken])

    return (
        <Router>
            <ScrollToTop>
                {!loading && <Switch>
                    <PlebRoute exact path={'/admin/login'} component={Login}/>
                    <AdminRoute path={'/admin'} component={AdminWindow}/>
                    <Route path={'/'} component={MainPage}/>
                    <Route path={'*'} component={NotFound}/>
                </Switch>}
            </ScrollToTop>
        </Router>
    );
}
export default connect(null, {setAccessToken})(App);
