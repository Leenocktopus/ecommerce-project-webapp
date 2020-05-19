import React, {Component} from 'react';
import './../../css/service-page.css'
import RequestForm from "../Api/RequestForm";

class ServicePage extends Component {

    render() {
        return (
            <div>
                <div className="container">
                    <div id="highlight-service">
                        <div><img src="http://localhost:8080/images/page_content/diagnostic.jpg"/>
                            <h3>Повна діагностика</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse</p>
                        </div>
                        <div><img src="http://localhost:8080/images/page_content/remont.jpg"/>
                            <h3>Ремонт насосів, колекторних та електричних машин</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse</p>
                        </div>
                        <div><img src="http://localhost:8080/images/page_content/peremotka.jpg"/>
                            <h3>Перемотка низьковольтних двигунів</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse</p>
                        </div>
                        <div><img src="http://localhost:8080/images/page_content/cleaner.jpg"/>
                            <h3>Ремонт та заміна двигунів побутової техніки</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse</p>
                        </div>
                        <div><img src="http://localhost:8080/images/page_content/ball.jpg"/>
                            <h3>Заміна підшипників</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse</p>
                        </div>
                        <div><img src="http://localhost:8080/images/page_content/allrepair.jpg"/>
                            <h3>Механічні роботи, пов’язані з ремонтом електричних машин</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse</p>
                        </div>
                    </div>
                    <RequestForm/>
                </div>
            </div>

        );
    }
}

export default ServicePage;