import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {addToCart} from "../redux/actions";

class Products extends Component {
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
        const data = this.props.products;
        var self = this;
        return (
            <div id="products">
                <div id="snackbar">Товар додано в кошик.</div>
                {data.map(function (product) {
                    return (

                        <div className="product-card">
                            <div className="product-image-shop">
                                <Link to={`/product/${product.productId}`}>

                                    <img src={`http://localhost:8080/images/products/${product.productId}.png`}
                                         onError={(e) => {
                                             e.target.onError = null;
                                             e.target.src = "http://localhost:8080/images/products/not_found.png";
                                         }}/>
                                </Link></div>
                            <div className="info-grid">
                                <div><Link to={`/product/${product.productId}`}>
                                    <div className="product-name" key={product.productId}>{product.name}</div>
                                </Link></div>
                                <div id="price">{product.price} грн</div>


                                <div className="star-rating comment" style={{border: "0"}}><i
                                    style={{width: `${100 * product.totalScore / 5}%`}}/></div>
                                <div>
                                    <button id="add-to-cart" onClick={() => self.add({
                                        "prod_id": product.productId,
                                        "name": product.name,
                                        "price": product.price
                                    })}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                             viewBox="0 0 24 24">
                                            <path
                                                d="M16.53 7l-.564 2h-15.127l-.839-2h16.53zm-14.013 6h12.319l.564-2h-13.722l.839 2zm5.983 5c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm11.305-15l-3.432 12h-13.017l.839 2h13.659l3.474-12h1.929l.743-2h-4.195zm-6.305 15c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
        );
    }
}

export default connect(null, {addToCart})(Products);
