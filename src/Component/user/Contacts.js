import React from "react";
import Location from "./Location";

const Contacts = () => {

    return (
        <div id={"contacts-container"}>
            <table id={"contacts-table"}>
                <thead>

                </thead>
                <tbody>
                <tr>
                    <td><i className="fa fa-envelope"/></td>
                    <td>Email:</td>
                    <td>eshop10323@gmail.com</td>
                </tr>
                <tr>
                    <td><i className="fa fa-phone"/></td>
                    <td>Phone:</td>
                    <td>
                        <ul id={"phone-list"}>
                            <li>+380-000-00-00</li>
                            <li>+380-999-99-99</li>
                            <li>+380-555-55-55</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td><i className="fa fa-telegram"/></td>
                    <td>Telegram:</td>
                    <td>@Eshop10323</td>
                </tr>
                <tr>
                    <td><i className="fa fa-map-o"/></td>
                    <td>Address:</td>
                    <td>Khreschatyk str. 24</td>
                </tr>
                </tbody>
            </table>
            <Location/>
            <div id={"about-us"}>
                <div>ABOUT US</div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque beatae culpa deserunt
                    doloribus, eveniet exercitationem facilis harum iure labore magnam magni obcaecati perspiciatis
                    quis recusandae soluta voluptas voluptates?
                    temporibus?</p>
                <p>A ad adipisci aperiam aspernatur aut consequuntur
                    cupiditate debitis deserunt distinctio doloribus eaque explicabo fuga fugiat illum incidunt
                    ipsam itaque iusto labore magnam magni maiores, molestias nemo nulla odio optio quaerat qui quia
                    quibusdam quis, rerum, similique sint sit suscipit tenetur ullam vel vitae! </p>
                <p>Aliquam distinctio
                    eos error esse excepturi, fugit ipsum itaque iusto maiores natus non pariatur quibusdam
                    repellendus tempore veniam? Atque dolores eveniet minima optio perspiciatis praesentium
                    tempora</p>
            </div>
        </div>
    );

}

export default Contacts