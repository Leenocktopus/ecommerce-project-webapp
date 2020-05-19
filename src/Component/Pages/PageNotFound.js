import React, {Component} from "react";


class PageNotFound extends Component {

    render() {
        return (
            <div className="container">
                <div id="error-message">
                    <h3> Помилка 404! На сервері немає такої сторінки</h3>
                </div>

            </div>
        );
    }
}

export default PageNotFound;