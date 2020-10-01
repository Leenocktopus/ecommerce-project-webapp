import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ScrollToTop from "./Component/util/ScrollToTop";
import Footer from "./Component/user/Footer";
import Header from "./Component/user/Header";
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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        axiosSecurity.get("/refresh")
            .then(response => response.data.token)
            .then(
                token => {
                    this.props.setAccessToken(token)
                    this.setState({loading:false})
                }
            ).catch(() => this.setState({loading:false}))
    }

    render() {
        return (
                <Router>
                    <ScrollToTop>
                        {/*<Header/>*/}
                            {!this.state.loading && <Switch>
                                <PlebRoute exact path={'/admin/login'} component={Login}/>
                                <AdminRoute path={'/admin'} component={AdminWindow}/>
                                <Route path={'/'} component={MainPage}/>
                                <Route path={'*'} component={NotFound}/>
                            </Switch>}
                        {/*<Footer/>*/}
                    </ScrollToTop>
                </Router>
        );
    }
}

export default connect(null, {setAccessToken})(App);
