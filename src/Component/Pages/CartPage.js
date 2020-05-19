import React, {Component} from "react";
import './../../css/cart-page.css'
import {connect} from 'react-redux';
import {deleteAll, removeFromCart, setItems} from "../redux/actions";
import axios from 'axios';

class CartPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.submitOrder = this.submitOrder.bind(this);
    }


    submitOrder() {

        //this.props.cartProps.cartItems;
        const body = {
            name: this.firstname.value + " " + this.lastname.value,
            phone: this.phone.value,
            email: this.email.value,
            date: new Date().toISOString().slice(0, 19),
            products: this.props.cartProps.cartItems.map(item => {
                return {
                    id: item.product.prod_id,
                    quantity: item.quantity
                }
            })
        };

        axios.post("/orders", body).then(
            (res) => {
                if (res.status === 200) {
                    this.props.deleteAll();
                    this.props.history.push("/order/success");
                }
            }
        );
    }


    render() {
        let items;
        if (this.props.cartProps.cartItems.length) {
            items = this.props.cartProps.cartItems.map((item) => {
                return (
                    <div className="item">
                        <span><button id="removeProduct"
                                      onClick={() => this.props.removeFromCart(item.product.prod_id)}>&times;</button></span>
                        <img style={{height: "40px", width: "40px", objectFit: "scale-down"}}
                             src={`http://localhost:8080/images/products/${item.product.prod_id}.png`}/>
                        <span>{item.product.name}</span>
                        <span>{item.product.price}грн</span>
                        <span>
                                                <input type="number" min={1} max={100} defaultValue={item.quantity}
                                                       onChange={event => {
                                                           this.props.setItems({
                                                               prod_id: item.product.prod_id,
                                                               quantity: event.target.value
                                                           })
                                                       }}/>
                                                </span>
                        <span>{item.product.price * item.quantity} грн</span>
                        <span/>
                    </div>);
            })
        } else {
            items = <div style={{justifySelf: "center"}}>В кошику пусто</div>
        }
        return (

            <div className="container">
                <div id="global-grid">

                    <div>
                        <h2>Кошик</h2>

                        <div id="cart-grid">

                            <div className="header">
                                <span/>
                                <span/>
                                <span>Товар</span>
                                <span>Ціна</span>
                                <span>Кількість</span>
                                <span>Сума</span>
                            </div>

                            {items}
                            <div className="item"/>

                            <div className="footer">
                                <span/>
                                <span/>
                                <span/>
                                <span id="label">Загальна сума</span>
                                <span
                                    style={{fontWeight: "bolder"}}>{this.props.cartProps.cartItems.map(item => item.product.price * item.quantity).reduce((a, b) => a + b, 0)}</span>
                            </div>
                        </div>
                    </div>


                    <div>
                        <h2>Оформлення замовлення</h2>
                        <div id="customer-form-wrapper">
                            <div id="customer-form-title">Контактні дані</div>
                            <div id="customer-form-grid">
                                <label htmlFor="customer-first-name">Ім'я</label>
                                <input type="text" id="customer-first-name" required="required"
                                       ref={(ref) => this.firstname = ref}/>
                                <label htmlFor="customer-last-name">Призвіще</label>
                                <input type="text" id="customer-last-name" required="required"
                                       ref={(ref) => this.lastname = ref}/>
                                <label htmlFor="customer-phone">Телефон</label>
                                <input type="text" id="customer-phone" required="required"
                                       ref={(ref) => this.phone = ref}/>
                                <label htmlFor="customer-email">Ел. пошта</label>
                                <input type="email" id="customer-email" required="required"
                                       ref={(ref) => this.email = ref}/>

                            </div>
                            <button id="submit-order-button" onClick={this.submitOrder}>Оформити замовлення</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cartProps: state.cartState
});


export default connect(mapStateToProps, {setItems, removeFromCart, deleteAll})(CartPage);