import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";

import {connect} from "react-redux";

class LoggedInRoute extends Component {
    render() {
        const {component: Component, token, ...prop} = this.props;
        return (
            <Route {...prop} render={props => {
                if (!token) {
                    return <Component {...props}/>
                }
                return <Redirect to={{pathname: "main", state: {from: props.location}}}/>
            }}/>)
    }
}

const mapStateToProps = state => {
    return {
        token: state.tokenState.token
    };
};
export default connect(mapStateToProps, null)(LoggedInRoute)






