import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {axiosAPI} from "../../../util/axiosConfig";

const ProductModal = (props) => {
    const {isOpen, close, categories, manufacturers, attr, currentProduct} = props;
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [attributes, setAttributes] = useState([]);
    useEffect(() => {
        setName(currentProduct.name)
        setPrice(currentProduct.price)
        setStock(currentProduct.amountInStock)
        setDescription(currentProduct.descr)
        if (!currentProduct.id) {
            setCategory(categories[0].name)
            setManufacturer(manufacturers[0].name)
        } else {
            setCategory(currentProduct.category.name)
            setManufacturer(currentProduct.manufacturer.name)
            setAttributes(attr)
        }

    }, [currentProduct, attr])

    const closeModal = () => {
        setAttributes("")
        close()
    }
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
            axiosAPI.put(url, obj).then((res) => saveAttributes(res.data.id)).then(() => closeModal())
        } else {
            axiosAPI.post(url, obj).then((res) => saveAttributes(res.data.id)).then(() => closeModal())
        }
    }
    const saveAttributes = (id) => {

        const attrIds = attr.map(item => item.id)
        const attributesIds = attributes.map(item => item.id)
        const attributesToDelete = attr.filter(
            attribute => !attributesIds.includes(attribute.id))
        const attributesToChange = attributes.filter(
            attribute => attrIds.includes(attribute.id) && !attr.includes(attribute))
        const attributesToAdd = attributes.filter(attribute => !attrIds.includes(attribute.id))
            .map(item => ({
                name: item.name,
                value: item.value
            }))
        let url = `/products/${id}/attributes`
        attributesToDelete.forEach(item => axiosAPI.delete(`${url}/${item.id}`))

        attributesToChange.forEach(item => axiosAPI.put(`${url}/${item.id}`, item))

        attributesToAdd.forEach(item => axiosAPI.post(url, item))
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
            <div className={"modal-container"}>
                <h2>{currentProduct.id ? currentProduct.id : "New item"} <small><i
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
                    <div className={"modal-description"}>
                        <div>Description:</div>
                        <textarea value={description} onChange={e => setDescription(e.target.value)}/>
                    </div>
                    <div className={"admin-product-modal-attributes"}>
                        <table className={"attributes-table"}>
                            <thead>
                            <tr>
                                <th className={"attributes-heading"}>Name</th>
                                <th className={"attributes-heading"}>Value</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {attributes && attributes.map(item =>
                                <tr key={item.id}>
                                    <td><input className={"admin-control-input"} type={"text"} value={item.name}
                                               onChange={(e) => {
                                                   const name = e.target.value
                                                   setAttributes((currentAttr) => currentAttr.map(x => x.id === item.id ? {
                                                       ...x,
                                                       name
                                                   } : x))
                                               }}/></td>
                                    <td><input className={"admin-control-input"} type={"text"} value={item.value}
                                               onChange={(e) => {
                                                   const value = e.target.value
                                                   setAttributes((currentAttr) => currentAttr.map(x => x.id === item.id ? {
                                                       ...x,
                                                       value
                                                   } : x))
                                               }}/></td>
                                    <td>
                                        <button className={"admin-icon-button remove-attribute"}
                                                onClick={() => {
                                                    setAttributes(
                                                        currentAttr => currentAttr.filter(x => x.id !== item.id))
                                                }}>
                                            {"\u2716"}
                                        </button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        <button className={"admin-button left-bottom-grid"}
                                onClick={() => {
                                    setAttributes(currentAttr => [...currentAttr, {
                                        id: (Math.random() / Math.random()) / Date.now(),
                                        name: "",
                                        value: ""
                                    }])
                                }}>Add new..
                        </button>
                    </div>


                    <button className={"admin-button left-bottom-grid"} onClick={closeModal}>Close</button>
                    <button className={"admin-button right-bottom-grid"} onClick={save}>Save</button>
                </div>
            </div>

        </Modal>
    );
}
export default ProductModal