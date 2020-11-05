import React, {useEffect, useState} from "react";
import {axiosAPI} from "../../util/axiosConfig";
import ManufacturersModal from "./modal/ManufacturerModal";
import Manufacturer from "./entity/Manufacturer";

const Manufacturers = () => {
    const defaultManufacturer = {id: "", name: ""}
    const [manufacturers, setManufacturers] = useState(null);
    const [error, setError] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentManufacturer, setCurrentManufacturer] = useState("");
    useEffect(() => {
        reload()
    }, [])

    const reload = () => {
        axiosAPI.get('/manufacturers').then(res => setManufacturers(res.data._embedded.manufacturerModelList))
    }


    const remove = (id) => {
        axiosAPI.delete(`/manufacturers/${id}`)
            .then(() => reload())
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
        <div className={"admin-window-main-grid"}>
            {<ManufacturersModal isOpen={isModalOpen}
                                 close={closeModal}
                                 currentManufacturer={currentManufacturer}
                                 reload={reload}/>
            }
            <button className={"admin-button left-top-grid"}
                    onClick={() => setModalOpen(true)}>Add new...
            </button>
            <div/>

            {error ? <div className={"admin-div-error"}>{error}</div> : <div>&nbsp;</div>}

            <table className={"entity-table"}>
                <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {manufacturers && <Manufacturer manufacturers={manufacturers} openModal={openModal} remove={remove}/>}

                </tbody>
            </table>
        </div>
    );
}

export default Manufacturers