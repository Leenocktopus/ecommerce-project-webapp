import React from "react";

const Category = ({category, openModal, remove}) => {
    return (
        <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>
                <button className={"admin-icon-button"}><i className="fa fa-edit"
                                                           onClick={() => openModal(category.id)}/></button>
                <button className={"admin-icon-button"}><i className="fa fa-trash"
                                                           onClick={() => remove(category.id)}/></button>
            </td>
        </tr>
    )
}
export default Category