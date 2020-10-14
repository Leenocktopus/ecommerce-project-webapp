import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {axiosAPI} from "../../../util/axiosConfig";

const CategoriesModal = (props) => {
    const{isOpen, close, currentCategory} = props;
    const[name, setName] = useState("");
    useEffect( () => {
        setName(currentCategory.name)
    }, [currentCategory])

    // TODO name validation
    const save = () =>{
        if (currentCategory.id){
            axiosAPI.put(`/categories/${currentCategory.id}`, {name}).then(() => close())
        } else {
            axiosAPI.post('/categories', {name}).then(() => close())
        }

    }
    return (
        <Modal style={{
            overlay: {
            },
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
            <div className={"control-modal"} >
                <h2>{currentCategory.id ? currentCategory.id : "New item"} <small><i className="fa fa-pencil fa-10x" /></small></h2>
                <div className={"control-modal-grid"} >
                    <table className={"control-modal-table"}>
                        <thead>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Name: </td>
                            <td>
                                <input className={"admin-control-input"} type={"text"} value={name} onChange={e => setName(e.target.value)}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div/>
                        <button className={"admin-control-button left-bottom-grid"} onClick={close}>Close</button>
                        <button className={"admin-control-button right-bottom-grid"} onClick={save}>Save</button>
                </div>
            </div>

        </Modal>
    );
}
export default CategoriesModal