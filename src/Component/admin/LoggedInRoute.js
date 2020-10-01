import React from "react";
import {Redirect, Route} from "react-router-dom";

import {connect} from "react-redux";

const LoggedInRoute = ({component: Component, token, ...otherProps}) => {
    return (
        <Route {...otherProps} render={props => {
            if (!token) {
                return <Component {...props}/>
            }
            return <Redirect to={{pathname: "main", state: {from: props.location}}}/>
        }}/>)
}

const mapStateToProps = state => {
    return {
        token: state.tokenState.token
    };
};
export default connect(mapStateToProps, null)(LoggedInRoute)






