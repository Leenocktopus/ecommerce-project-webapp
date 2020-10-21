import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {axiosAPI} from "../../../util/axiosConfig";

const ProductModal = (props) => {
    const {isOpen, close, categories, manufacturers, currentProduct} = props;
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    useEffect(() => {
        setName(currentProduct.name)
        setPrice(currentProduct.price)
        setStock(currentProduct.amountInStock)
        setDescription(currentProduct.descr)
        if (!currentProduct.id) {
            setCategory(categories[0].name)
            setManufacturer(manufacturers[0].name)
        }
    }, [currentProduct])


    const save = () => {
        let url = "/products"
        let obj = {
            name: name,
            manufacturer: {
                id: manufacturers.find(item => item.name === manufacturer).id
            },
            category: {
                id: categories.find(item => item.name === category).id
            },
            price: price,
            amountInStock: stock,
            descr: description
        };
        if (currentProduct.id) {
            obj["id"] = currentProduct.id;
            url = url + "/" + currentProduct.id;
            axiosAPI.put(url, obj).then(() => close())
        } else {
            axiosAPI.post(url, obj).then(() => close())
        }
    }

    return (
        <Modal style={{
            overlay: {},
            content: {
                borderRadius: 10,
                padding: 0,
                height: "60%",
                width: "50%",
                margin: "auto",
                boxShadow: "0 1px 15px rgba(64,64,64,.7)",
            }
        }}
               appElement={document.getElementById('root')} isOpen={isOpen} /*onRequestClose={close}*/>
            <div className={"control-modal"}>
                <h2>{currentProduct.id ? currentProduct.id : "New item"} <small><i
                    className="fa fa-pencil fa-10x"/></small></h2>
                <div className={"control-modal-grid"}>
                    <table className={"control-modal-table"}>
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
                        <tr>
                            <td>Category:</td>
                            <td>
                                <select className={"admin-control-select"} value={category}
                                        onChange={(e) => setCategory(e.target.value)}>
                                    {categories.map(item => <option key={item.id}>{item.name}</option>)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Manufacturer:</td>
                            <td>
                                <select className={"admin-control-select"} value={manufacturer}
                                        onChange={(e) => setManufacturer(e.target.value)}>
                                    {manufacturers.map(item => <option key={item.id}>{item.name}</option>)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Price:</td>
                            <td>
                                <input className={"admin-control-input"} type={"text"} value={price}
                                       onChange={e => setPrice(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Stock:</td>
                            <td>
                                <input className={"admin-control-input"} type={"text"} value={stock}
                                       onChange={e => setStock(e.target.value)}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className={"control-modal-description"}>
                        <div>Description:</div>
                        <textarea value={description} onChange={e => setDescription(e.target.value)}/>
                    </div>
                    <button className={"admin-control-button left-bottom-grid"} onClick={close}>Close</button>
                    <button className={"admin-control-button right-bottom-grid"} onClick={save}>Save</button>
                </div>
            </div>

        </Modal>
    );
}
export default ProductModal