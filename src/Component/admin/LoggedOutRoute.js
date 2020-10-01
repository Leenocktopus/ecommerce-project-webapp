import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";

class LoggedOutRoute extends Component {
    render() {
        const {component: Component, token, ...prop} = this.props;
        return (
            <Route {...prop} render={props => {
                if (token) {
                    return <Component {...props}/>
                }
                return <Redirect to={{pathname: "login", state: {from: props.location}}}/>
            }}/>)
    }
}

const mapStateToProps = state => {
    return {
        token: state.tokenState.token
    };
};
export default connect(mapStateToProps, null)(LoggedOutRoute)






