import React from "react";
import not_found from "../../styles/images/not_found.png";
import {Link} from "react-router-dom";
import {addToCart} from "../redux/actions/cartActions";
import {connect} from "react-redux";

const Product = ({product, addToCart}) => {
    const startStyle = {
        width: `${100 * product.totalScore / 5}%`
    }

    return (
        <div className={"product-card"}>
            <Link to={`/product/${product.id}`} className={"product-card-link"}>
                <img className={"product-card-image"}
                     alt={product.name}
                     src={product.images.length > 0 ? `http://localhost:8080/images/${product.id}/${product.images[0].filename}`
                         : not_found}/></Link>
            <Link to={`/product/${product.id}`} className={"product-card-link"}>
                <div className={"product-name"}>{product.name}</div>
            </Link>
            <div className="star-rating comment">
                <i style={startStyle}/>
            </div>
            <div className={"product-price"}>{(product.price).toLocaleString()}$</div>

            {product.amountInStock === 0 ? <span className={"out-of-stock"}>Out of stock</span> :
                <button className={"product-card-buy"} onClick={() => addToCart({
                    "prod_id": product.id,
                    "name": product.name,
                    "price": product.price,
                    "img": product.images.length > 0 ? `http://localhost:8080/images/${product.id}/${product.images[0].filename}` : ""
                })}>Buy now</button>}
        </div>
    )
}
export default connect(null, {addToCart})(Product)