import React from "react";

const Manufacturer = ({manufacturer, openModal, remove}) => {
    return (

        <tr key={manufacturer.id}>
            <td>{manufacturer.id}</td>
            <td>{manufacturer.name}</td>
            <td>
                <button className={"admin-icon-button"}><i className="fa fa-edit"
                                                           onClick={() => openModal(manufacturer.id)}/></button>
                <button className={"admin-icon-button"}><i className="fa fa-trash"
                                                           onClick={() => remove(manufacturer.id)}/></button>
            </td>
        </tr>
    )
}
export default Manufacturer