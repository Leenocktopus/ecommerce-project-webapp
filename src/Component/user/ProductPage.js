import React, {useEffect, useState} from "react";
import {axiosAPI} from "../util/axiosConfig";
import not_found from "../../styles/images/not_found.png";
import Loading from "../util/Loading";
import Comments from "./CommentSection";
import Slider from "./Slider";

const ProductPage = ({match}) => {
    const [product, setProduct] = useState(null);
    const [attributes, setAttributes] = useState(null);

    useEffect(() => {
        axiosAPI.get(`products/${match.params.id}`).then(res => setProduct(res.data))
        axiosAPI.get(`products/${match.params.id}/attributes`).then(res => setAttributes(res.data._embedded.productAttributeModelList))

    }, [])

    const startStyle = {
        width: `${100 * product ? product.totalScore : null / 5}%`
    }
    return (
        <div id={"product=page-container"}>

            {product ? <div id={"product-info-grid"}>
                <Slider id={match.params.id}/>
                <div className={"product-name"}>{product.name}</div>
                <div className="star-rating comment">
                    <i style={startStyle}/>
                </div>
                <div className={"product-price"}>{product.price}$</div>
                {product.amountInStock === 0 ? <span className={"out-of-stock"}>Out of stock</span> :
                    <button className={"product-card-buy"}>Buy now</button>}
            </div>: <Loading/>}

            <Comments id={match.params.id}/>
        </div>

    );

}

export default ProductPage