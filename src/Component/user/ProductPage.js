import React, {useEffect, useState} from "react";
import {axiosAPI} from "../util/axiosConfig";
import Loading from "../util/Loading";
import Comments from "./CommentSection";
import Slider from "./Slider";
import AttributesSection from "./AttributesSection";

const ProductPage = ({match}) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axiosAPI.get(`products/${match.params.id}`).then(res => setProduct(res.data))
    }, [])



    const startStyle = {
        width: `${100 * product ? product.totalScore : null / 5}%`
    }

    return (
        <div id={"product=page-container"}>
            {product ? <>
                    <div id={"product-info-grid"}>
                        <Slider url={product._links.images.href}/>
                        <div className={"product-name"}>{product.name}</div>
                        <div className="star-rating comment">
                            <i style={startStyle}/>
                        </div>
                        <div className={"product-price"}>{product.price}$</div>
                        {product.amountInStock === 0 ? <span className={"out-of-stock"}>Out of stock</span> :
                            <button className={"product-card-buy"}>Buy now</button>}
                    </div>
                    <AttributesSection url={product._links.attributes.href}/>
                    <Comments url={product._links.comments.href}/>
                </>
                : <Loading/>
            }
        </div>

    );

}

export default ProductPage