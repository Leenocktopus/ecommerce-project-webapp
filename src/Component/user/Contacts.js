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
                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. At autem consequuntur, distinctio
                    doloribus est hic in ipsum itaque, laboriosam laudantium libero modi officia quod rem repellat. </p>
                <p> Amet at atque
                    consectetur, dolor doloribus dolorum eum exercitationem explicabo fuga fugit magni maxime modi nam,
                    natus, nisi odio perspiciatis possimus provident quaerat quia quisquam repellendus reprehenderit
                    sint totam veniam voluptate voluptates. Ad aut cumque distinctio est eum illo, impedit ipsa labore,
                    maiores nihil nobis, odit repellendus reprehenderit sequi soluta. </p>
                <p> At explicabo natus unde. Aperiam in inventore numquam porro sapiente? Dolor iusto numquam
                    repellendus? Atque consectetur cumque delectus dolor fugiat hic incidunt laboriosam, magnam maxime
                    minima non nulla numquam quod suscipit, tenetur, velit voluptatibus. Architecto asperiores at
                    cupiditate dolor, dolorem doloremque ducimus ex exercitationem harum iusto modi, molestiae mollitia,
                    officia quisquam saepe sunt suscipit voluptate!</p>
                <p> Aperiam architecto commodi consequatur cupiditate dolores eius error fuga, iste laboriosam laborum
                    molestias officiis quaerat, repellat, repellendus repudiandae tenetur.</p>
            </div>
        </div>
    );

}

export default Contacts