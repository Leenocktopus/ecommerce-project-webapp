import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCartItems} from "./redux/actions";

class Header extends Component {

    componentDidMount() {
        getCartItems();
    }

    render() {

        return (
            <header>
                <div className="container">
                    <Link to="/"><h1 style={{float: "left", textTransform: "none"}}> ЕМ-Сервіс</h1></Link>
                    <div id="logo">
                        <ul id="contacts">
                            <li>
                                <i className="fa fa-phone"/> +380 11 111 11 11
                            </li>
                            <li>
                                <i className="fa fa-envelope"/> Leenocktopus@ukr.net
                            </li>
                            <li>
                                <i className="fa fa-map-marker"/> Kiev avenue, 1, office 1
                            </li>
                        </ul>
                    </div>
                    <br/>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/service">Ремонт</Link>

                            </li>
                            <li>
                                <Link to="/shop">Магазин</Link>
                            </li>
                            <li>
                                <Link to="/about">Про нас</Link>
                            </li>
                            <li style={{borderRight: "2px solid #000000"}}>
                                <Link to="/contacts">Контакти</Link>
                            </li>
                            <li>
                                <Link to="/cart">Кошик (<span
                                    id="cart-products-amount">{this.props.cartProps.cartItems.map((val) => {
                                    return parseInt(val.quantity)
                                }).reduce((a, b) => a + b, 0)}</span>)</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => ({
    cartProps: state.cartState
});
export default connect(mapStateToProps, null)(Header);