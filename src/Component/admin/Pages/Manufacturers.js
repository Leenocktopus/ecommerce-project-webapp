import React, {useEffect, useState} from "react";
import {axiosAPI} from "../../util/axiosConfig";
import ManufacturersModal from "./modal/ManufacturerModal";

const Manufacturers = () => {
    const defaultManufacturer = {id: "", name: ""}
    const[manufacturers, setManufacturers] = useState(null);
    const[error, setError] = useState("");
    const[isModalOpen, setModalOpen] = useState("");
    const[currentManufacturer, setCurrentManufacturer] = useState("");
    useEffect(() => {
        reload()
    },[])

    const reload = () =>{
        axiosAPI.get('/manufacturers').then(res => setManufacturers(res.data._embedded.manufacturerModelList))
    }


    const remove = (id) => {
        axiosAPI.delete(`/manufacturers/${id}`)
            .then(() =>  reload())
            .then(() => setError(""))
            .catch(() => setError("Can't delete manufacturer. Delete products first."))
    }

    const openModal = (id) => {
        setCurrentManufacturer(manufacturers.find(item => item.id === id))
        setModalOpen(true)

    }
    const closeModal = () => {
        setCurrentManufacturer(defaultManufacturer)
        setModalOpen(false)
        reload()
    }
    return (
        <div className={"admin-control-main-grid"}>
            {<ManufacturersModal isOpen={isModalOpen}
                              close={closeModal}
                              currentManufacturer={currentManufacturer}
                              reload={reload}/>
            }
            <button className={"admin-control-button"} style={{justifySelf: "left"}} onClick={() => setModalOpen(true)}>Add new...</button>
            <div/>

            {error ? <div className={"delete-error"}>{error}</div>:<div>&nbsp;</div>}

            <table className={"control-table"}>
                <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {manufacturers && manufacturers.map(item =>
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                            <button className={"icon-button"}><i className="fa fa-edit" onClick={() => openModal(item.id)}/></button>
                            <button className={"icon-button"}><i className="fa fa-trash" onClick={() => remove(item.id)}/></button>
                        </td>
                    </tr>)}

                </tbody>
            </table>
        </div>
    );
}

export default Manufacturers