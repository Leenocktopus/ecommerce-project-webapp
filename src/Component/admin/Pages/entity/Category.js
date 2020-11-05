import React from "react";

const Category = (props) => {
    const {categories, openModal, remove} = props;
    return (
        <>
            {categories.map(item =>
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                        <button className={"admin-icon-button"}><i className="fa fa-edit"
                                                                   onClick={() => openModal(item.id)}/></button>
                        <button className={"admin-icon-button"}><i className="fa fa-trash"
                                                                   onClick={() => remove(item.id)}/></button>
                    </td>
                </tr>)}
        </>

    )

}
export default Category