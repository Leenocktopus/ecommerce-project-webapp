import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";

class RequestForm extends Component {


    constructor(props) {
        super(props);
        this.submitRequest = this.submitRequest.bind(this);
    }

    submitRequest(event) {
        event.preventDefault();
        const body = {
            "phone": this.phone.value,
            "text": this.text.value,
            "time": new Date().toISOString().slice(0, 19)
        };
        axios.post("/requests", body);

        this.props.history.push("/request/success");

    }

    render() {
        return (
            <form onSubmit={this.submitRequest}>
                <div id="fieldset">
                    <div id="form-grid">
                        <div>
                            <h1>Не впевнені що вам потрібно? Запитайте у нас</h1>
                        </div>
                        <div style={{float: "right"}}>
                            <label htmlFor="phone">Ваш телефон: </label>
                            <br/>
                            <input id="phone" type="text" required="required" ref={(ref) => this.phone = ref}/>
                            <br/>
                            <label htmlFor="comment-text">Коротко опишіть вашу проблему:</label>
                            <br/>
                            <textarea id="comment-text" rows="4" ref={(ref) => this.text = ref}/>
                            <br/>
                            <button id={"request-button"}>Надіслати</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }


}

export default withRouter(RequestForm);