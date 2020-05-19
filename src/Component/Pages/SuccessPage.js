import React, {Component} from "react";
import {Link} from 'react-router-dom';

class SuccessPage extends Component {

    render() {

        return (
            <div className="container">
                <div id="success-message">
                    <h3>{this.props.message}</h3>
                    <Link id="success-index-link" to="/">На головну &rsaquo; </Link>
                </div>

            </div>
        );
    }

}

export default SuccessPage;