import React from "react";
import not_found from "../../../../css/images/not_found.png";

const Product = (props) => {
    const {products, openProductModalWithProduct, openImageModalWithProduct, remove} = props;

    return (
        <>
            {products.map(item => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                        <img className={"entity-image"}
                             alt={`product`}
                             src={item.images.length > 0 ? `http://localhost:8080/images/${item.id}/${item.images[0].filename}` : not_found}/>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.manufacturer.name}</td>
                    <td>{item.category.name}</td>
                    <td>{item.price}</td>
                    <td>{item.amountInStock}</td>
                    <td>{item.popularity}</td>
                    <td>{item.totalScore}</td>
                    <td>
                        <button className={"admin-icon-button"}
                                onClick={() => openProductModalWithProduct(item.id)}><i
                            className="fa fa-edit"/></button>
                        <button className={"admin-icon-button"} onClick={() => openImageModalWithProduct(item.id)}>
                            <i
                                className="fa fa-picture-o"/></button>
                        <button className={"admin-icon-button"}><i className="fa fa-trash"
                                                                   onClick={() => remove(item.id)}/></button>
                    </td>
                </tr>
            ))}
        </>

    )

}
export default Product