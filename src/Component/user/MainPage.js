import React from "react";

const MainPage = () => {
    return (
        <div id={"main-page-container"}>
            <div id={"promo-container"}>
                <div id={"promo-one"}>
                    <div className={"promo-text"}>
                        <div className={"promo-name"}>Google Pixel 5</div>
                        <button className={"shop-now-button"}>Shop now <span
                            className={"shop-now-arrow"}>&raquo;</span></button>
                    </div>
                </div>
                <div id={"promo-two"}>
                    <div className={"promo-text"}>
                        <div className={"promo-name"}>Dell XPS 15</div>
                        <button className={"shop-now-button"}>Shop now <span
                            className={"shop-now-arrow"}>&raquo;</span></button>
                    </div>
                </div>
                <div id={"promo-three"}>
                    <div className={"promo-text"}>
                        <div className={"promo-name"}>Sony Playstation 5</div>
                        <button className={"shop-now-button"}>Shop now <span
                            className={"shop-now-arrow"}>&raquo;</span></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage