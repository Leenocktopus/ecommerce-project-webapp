import React, {Component} from "react";


class CartProducts extends Component {
    render() {
        return (
            <div>
                {this.props.products.map((product) => {
                    return (
                        <div className="item">
                            <span>&times;</span>
                            <img style={{height: "40px", width: "40px", objectFit: "scale-down"}}
                                 src="http://localhost:8080/images/page_content/cleaner.jpg"/>
                            <span>{product.product.name}</span>
                            <span>{product.product.price}грн</span>
                            <span>
                                                <input type="number" min={1} max={100} defaultValue={product.quantity}/>
                                                </span>
                            <span>{product.product.price * product.quantity} грн</span>
                        </div>);
                })}
            </div>
        );
    }
}

export default CartProducts;