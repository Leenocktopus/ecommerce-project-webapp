import React from "react";

const Manufacturer = (props) => {
    const {manufacturers, openModal, remove} = props;
    return (
        <>
            {manufacturers.map(item =>
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
export default Manufacturer