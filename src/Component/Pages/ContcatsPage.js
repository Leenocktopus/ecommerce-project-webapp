import React, {Component} from "react";
import LeafletMap from "../Api/LeafletMap";
import './../../css/contacts-page.css'
import RequestForm from "../Api/RequestForm";

class ContactsPage extends Component {


    render() {
        return (
            <div>
                <div className="container">
                    <div id="contacts-grid">
                        <div id="info-grid">
                            <div className="info-grid-item left">
                                <h3>Телефон</h3>
                                <div>+380 50 111 11 11</div>
                                <div>+380 44 111 11 11</div>
                                <div>+380 96 111 11 11</div>
                            </div>
                            <div className="info-grid-item">
                                <h3>Графік роботи (Пн-Пт)</h3>
                                <div>з 9:00 до 18:00</div>
                            </div>
                            <div className="info-grid-item left">
                                <h3>E-mail</h3>
                                <div>Example1@email.com</div>
                                <div>Example2@email.com</div>
                            </div>
                            <div className="info-grid-item">
                                <h3>Адреса</h3>
                                <div>г. Київ, вул. Хрещатик, 24</div>
                            </div>
                        </div>

                        <LeafletMap id={"mapid"}/>
                    </div>
                    <RequestForm/>
                </div>
            </div>
        );
    }
}

export default ContactsPage;