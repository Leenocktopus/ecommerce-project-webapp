import React from "react";
import not_found from "../../../../styles/images/not_found.png";

const Product = ({product, openProductModalWithProduct, openImageModalWithProduct, remove}) => {

    return (
        <tr key={product.id}>
            <td>{product.id}</td>
            <td>
                <img className={"entity-image"}
                     alt={`product`}
                     src={product.images.length > 0 ? `http://localhost:8080/images/${product.id}/${product.images[0].filename}` : not_found}/>
            </td>
            <td>{product.name}</td>
            <td>{product.manufacturer.name}</td>
            <td>{product.category.name}</td>
            <td>{product.price}</td>
            <td>{product.amountInStock}</td>
            <td>{product.popularity}</td>
            <td>{product.totalScore}</td>
            <td>
                <button className={"admin-icon-button"}
                        onClick={() => openProductModalWithProduct(product.id)}><i
                    className="fa fa-edit"/></button>
                <button className={"admin-icon-button"} onClick={() => openImageModalWithProduct(product.id)}>
                    <i
                        className="fa fa-picture-o"/></button>
                <button className={"admin-icon-button"}><i className="fa fa-trash"
                                                           onClick={() => remove(product.id)}/></button>
            </td>
        </tr>
    )
}
export default Product