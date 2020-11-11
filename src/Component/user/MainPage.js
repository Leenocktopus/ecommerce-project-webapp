import React from "react";

const MainPage = ({location, history}) => {
    return (
        <div id={"main-page-container"}>
            {location.redirect &&
            <div id={"thank-you"}>
                <h3>Thanks for purchase!</h3>
                <div>Our operator will contact you as soon as possible.</div>
            </div>}
            <div id={"promo-container"}>
                <div id={"promo-one"}>
                    <div className={"promo-text"}>
                        <div className={"promo-name"}>Google Pixel 5</div>
                        <button className={"shop-now-button"} onClick={() => history.push("/product/998621")}>Shop now <span
                            className={"shop-now-arrow"}>&raquo;</span></button>
                    </div>
                </div>
                <div id={"promo-two"}>
                    <div className={"promo-text"}>
                        <div className={"promo-name"}>Dell XPS 15</div>
                        <button className={"shop-now-button"} onClick={() => history.push("/product/998638")}>Shop now <span
                            className={"shop-now-arrow"}>&raquo;</span></button>
                    </div>
                </div>
                <div id={"promo-three"}>
                    <div className={"promo-text"}>
                        <div className={"promo-name"}>Sony Playstation 5</div>
                        <button className={"shop-now-button"} onClick={() => history.push("/product/998634")}>Shop now <span
                            className={"shop-now-arrow"}>&raquo;</span></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage