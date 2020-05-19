import React, {Component} from 'react';
import {connect} from "react-redux";
import {addToCart} from "../redux/actions";

class ProductInfo extends Component {

    constructor(props, context) {
        super(props, context);
        this.add = this.add.bind(this);
    }

    add(val) {
        this.props.addToCart(val);
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () {
            x.className = x.className.replace("show", "");
        }, 3000);
    }

    render() {

        const data = this.props.product;
        return (
            <div className="product-grid">
                <div id="snackbar">Товар додано в кошик.</div>
                <div className="product-image">
                    <img src={`http://localhost:8080/images/products/${data.productId}.png`} onError={(e) => {
                        e.target.onError = null;
                        e.target.src = "http://localhost:8080/images/products/not_found.png";
                    }} width={"100%"} alt={"alt"}/>
                </div>
                <div className="product description">
                    <div className="description-part">
                        <h2>{data.name}</h2>
                        <div className="star-rating comment" id="rating">
                            <i style={{width: `${data.totalScore * 100 / 5}%`}}/></div>

                        <div>{data.manufacturer && data.manufacturer.name}</div>
                        <div>{data.price}<span style={{fontSize: "14px"}}>грн</span>
                            <button id="add-to-cart-button" onClick={() => this.add({
                                "prod_id": data.productId,
                                "name": data.name,
                                "price": data.price
                            })}>
                                <i className="fa fa-shopping-cart"/> Придбати
                            </button>
                        </div>
                    </div>
                    <div className="description-part">
                        <h4>Опис</h4>
                        <p>{data.descr}</p>
                    </div>
                </div>
            </div>
        );
    }
}

/**/
export default connect(null, {addToCart})(ProductInfo);