import React, {useState} from "react";
import {deleteAll, removeFromCart, setQuantity} from "../redux/actions/cartActions";
import {connect} from "react-redux";
import not_found from "./../../styles/images/not_found.png"
import {Link} from "react-router-dom";
import {axiosAPI} from "../util/axiosConfig";

const CartPage = ({cart, removeFromCart, setQuantity, deleteAll, history}) => {
    const [customerName, setCustomerName] = useState("")
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");

    const [nameError, setNameError] = useState("")
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");

    const submitOrder = () => {
        const reMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const rePhone = /^\+380-[0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]{2}$/

        if (!customerName) {
            setNameError("Name should not be empty")
        } else if (customerName.length > 20) {
            setNameError("Name is too long");
        } else {
            setNameError("")
        }
        if (!customerPhone) {
            setPhoneError("Phone should not be empty")
        } else if (!rePhone.test(String(customerPhone).toLowerCase())) {
            setPhoneError("Phone should have correct format")
        } else {
            setPhoneError("")
        }
        if (!customerEmail) {
            setEmailError("Email should not be empty")
        } else if (!reMail.test(String(customerEmail).toLowerCase())) {
            setEmailError("Email should have correct format")
        } else if (customerEmail.length > 35) {
            setEmailError("Email is too long");
        } else {
            setEmailError("")
        }

        if (!phoneError && !nameError && !emailError) {

            axiosAPI.post("/orders", {
                customerName,
                customerPhone,
                customerEmail,
                orderStatus: "PENDING",
                products: cart.cartItems.map(item => ({quantity: item.quantity, product: {id: item.product.prod_id}}))
            }).then(() => deleteAll()).then(() => history.push({pathname: "/", redirect: true}))
        }
    }


    return (
        <div id={"cart-page-container"}>
            <h3 id={"checkout-title"}>Checkout</h3>
            <div id={"cart-container"}>
                {cart.cartItems.length > 0 ? <>
                    <table>
                        <thead>
                        <tr>
                            <th>Product</th>
                            <th/>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {cart.cartItems.map(item =>
                            <tr key={item.product.prod_id}>
                                <td>{item.product.name}</td>
                                <td><img src={item.product.img ? item.product.img : not_found}/></td>
                                <td>{(item.product.price).toLocaleString()}$</td>
                                <td className={"quantity-cell"}>
                                    <button className={"button-plus"} onClick={() => setQuantity({
                                        prod_id: item.product.prod_id,
                                        quantity: item.quantity + 1
                                    })}>+
                                    </button>
                                    {item.quantity}
                                    <button className={"button-minus"} onClick={() => setQuantity({
                                        prod_id: item.product.prod_id,
                                        quantity: item.quantity - 1
                                    })}>&minus;
                                    </button>
                                </td>
                                <td>{(item.product.price * item.quantity).toLocaleString()}$</td>
                                <td>
                                    <button className={"button-remove"}
                                            onClick={() => removeFromCart(item.product.prod_id)}>&times;</button>
                                </td>
                            </tr>)}
                        <tr>
                            <td colSpan={4}>
                                <div id={"total"}>Total:</div>
                            </td>
                            <td>
                                <span
                                    id={"total-price"}>{cart.cartItems.map(item => item.product.price * item.quantity).reduce((x, y) => x + y, 0).toLocaleString()}$</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div id={"order-container"}>
                        <label htmlFor="name">Name: </label><br/>
                        <input type="text" value={customerName} id={"name"}
                               onChange={(e) => setCustomerName(e.target.value)}
                               autoComplete="off"/><br/>
                        {nameError ? <span>{nameError}</span> : <span>&nbsp;</span>} <br/>
                        <label htmlFor="phone">Phone: </label><br/>
                        <input type="tel" value={customerPhone} id={"phone"}
                               onChange={(e) => setCustomerPhone(e.target.value)}
                               onClick={(e) => !e.target.value && setCustomerPhone("+380-")}
                               placeholder={"+380-XX-XXX-XX-XX"}
                               autoComplete="off"/><br/>
                        {phoneError ? <span>{phoneError}</span> : <span>&nbsp;</span>} <br/>
                        <label htmlFor="email">Email:</label><br/>
                        <input type="email" value={customerEmail} id={"email"}
                               onChange={(e) => setCustomerEmail(e.target.value)}
                               autoComplete="off"/><br/>
                        {emailError ? <span>{emailError}</span> : <span>&nbsp;</span>} <br/>

                        <button id={"button-submit"} onClick={() => submitOrder()}>Check out</button>
                    </div>
                </> : <div id={"empty-cart"}>
                    <h3>Your cart is empty</h3>
                    <Link to={"/shop"} id={"go-shopping"}>Continue shopping</Link>
                </div>}

            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.cartState
    };
};
export default connect(mapStateToProps, {removeFromCart, setQuantity, deleteAll})(CartPage)