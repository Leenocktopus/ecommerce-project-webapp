import React, {Component} from "react";
import {Link} from "react-router-dom";
import './../../css/main-page.css'

class MainPage extends Component {


    render() {
        return (
            <div>
                <div className="container">
                    <div id="banner">

                    </div>
                </div>
                <div className="container">
                    <div id="highlight">
                        <div>
                            <h3>Безкоштовна діагностика</h3>
                            <img src="http://localhost:8080/images/page_content/search.png"/>
                            <p>Професійна діагностика з використанням найсучаснішого обладання</p>
                        </div>
                        <div>
                            <h3>Швидкий ремонт</h3>
                            <img src="http://localhost:8080/images/page_content/stopwatch.png"/>
                            <p>Здебільшого, ремонт займає від 1-го до 3-х днів</p>
                        </div>
                        <div>
                            <h3>Спеціалісти високого рівня</h3>
                            <img src="http://localhost:8080/images/page_content/tools.png"/>
                            <p>Наші спеціалісти мають профільну освіту та великий стаж роботи</p>

                        </div>
                    </div>
                </div>

                <div className="container">
                    <div id="services-grid">
                        <div id="main-content">
                            <h1 className="article-title">ЕМ-Сервіс</h1>
                            <p className="article-content">
                                ЕМ-Сервіс - це успішне підприємство що працює на ринку вже більше 10 років і обслуговує
                                як приватних так юридичних осіб. За роки роботи ми зарекомендували себе як професійну і
                                надійну компанію. Всі співробітники підприємства мають профільну вищу освіту і великий
                                досвід в ремонті, обслуговуванні та діагностиці широкого спектру електродвигунів та
                                інших електронних пристроїв. Також, наше підприємство надає гарантію від 6 місяців всі
                                види послуг в залежності від виду робіт.</p>
                            <p className="article-content">
                                Окрім ремонту ЕМ-Сервіс займається продажем супутньої продукції на кшталт запасних
                                деталей, підшипників, проводки, тощо. За рахунок широкого асортименту продукції ви
                                завжди зможете знайти необхідний товар, а у випадку якщо він знадобиться для ремонту ми
                                зможемо скоротити час за рахунок своїх запчастин. </p>

                        </div>
                        <div id="service-box">
                            <h1>Ремонт</h1>
                            <p> Заміна підшипників, перемотка, балансування роторів і статорів.</p>
                            <Link id="service-link" to="/service">Дізнатись більше &rsaquo;</Link>
                        </div>
                        <div id="shop-box">
                            <h1>Магазин</h1>
                            <p>Електродвигуни, насоси, електроінструмент, проводка та деталі.</p>
                            <Link id="shop-link" to="/shop">Перейти в магазин &rsaquo;</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;