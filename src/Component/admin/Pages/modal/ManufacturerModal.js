import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {axiosAPI} from "../../../util/axiosConfig";

const ManufacturersModal = (props) => {
    const {isOpen, close, currentManufacturer} = props;
    const [name, setName] = useState("");
    useEffect(() => {
        setName(currentManufacturer.name)
    }, [currentManufacturer])

    // TODO name validation
    const save = () => {
        if (currentManufacturer.id) {
            axiosAPI.put(`/manufacturers/${currentManufacturer.id}`, {name}).then(() => close())
        } else {
            axiosAPI.post('/manufacturers', {name}).then(() => close())
        }

    }
    return (
        <Modal style={{
            overlay: {},
            content: {
                borderRadius: 10,
                padding: 0,
                height: "40%",
                width: "30%",
                margin: "auto",
                boxShadow: "0 1px 15px rgba(64,64,64,.7)",
            }
        }}
               appElement={document.getElementById('root')} isOpen={isOpen}>
            <div className={"modal-container"}>
                <h2>{currentManufacturer.id ? currentManufacturer.id : "New item"} <small><i
                    className="fa fa-pencil fa-10x"/></small></h2>
                <div className={"modal-grid"}>
                    <table className={"modal-table"}>
                        <thead>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Name:</td>
                            <td>
                                <input className={"admin-control-input"} type={"text"} value={name}
                                       onChange={e => setName(e.target.value)}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div/>
                    <button className={"admin-button left-bottom-grid"} onClick={close}>Close</button>
                    <button className={"admin-button right-bottom-grid"} onClick={save}>Save</button>
                </div>
            </div>

        </Modal>
    );
}
export default ManufacturersModal