import React from "react";
import {addToCart, removeFromCart} from "../redux/actions/cartActions";
import {connect} from "react-redux";


const CartPage = () => {
    return (
        <div>CartItems</div>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.cartState.cartItems
    };
};
export default connect(mapStateToProps, {addToCart, removeFromCart})(CartPage)