import React, {useEffect, useState} from "react";
import {axiosAPI} from "../../util/axiosConfig";
import "../../../css/categories-window.css";
import ProductModal from "./modal/ProductModal";
import ImageModal from "./modal/ImageModal";
import not_found from "../../../css/not_found.png";

const Products = () => {
    const defaultProduct = {
        name: "",
        manufacturer: "",
        category: "",
        price: "",
        amountInStock: "",
        descr: "",
        popularity: "",
        totalScore: "",
        images: []
    };
    const defaultAttributes = {
        id: 0,
        name: "",
        value: ""
    };
    const defaultLink = "/products?page=0&size=25";
    const [products, setProducts] = useState(null);
    const [currentLink, setCurrentLink] = useState(defaultLink);
    const [links, setLinks] = useState({prev: null, next: null});
    const [search, setSearch] = useState("");
    const [isProductModalOpen, setProductModalOpen] = useState(false);
    const [isImageModalOpen, setImageModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(defaultProduct);


    const [categories, setCategories] = useState(null);
    const [manufacturers, setManufacturers] = useState(null);
    const [attributes, setAttributes] = useState([]);

    useEffect(() => {
        reload()
    }, [currentLink])

    useEffect(() => {
        if (products) {
            setLinks({
                prev: 'prev' in products._links ? products._links.prev.href : null,
                next: 'next' in products._links ? products._links.next.href : null
            })
        }
    }, [products])

    const reload = () => {
        axiosAPI.get(currentLink)
            .then(res => setProducts(res.data))
    }
    const openProductModal = () => {
        if (!manufacturers) {
            axiosAPI.get('/manufacturers').then(res => setManufacturers(res.data._embedded.manufacturerModelList))
        }
        if (!categories) {
            axiosAPI.get('/categories').then(res => setCategories(res.data._embedded.categoryModelList))
        }
        setProductModalOpen(true);
    }
    const openProductModalWithProduct = (id) => {
        setCurrentProduct(products._embedded.productModelList.find(item => item.id === id))
        axiosAPI.get(`/products/${id}/attributes`)
            .then(res => {if(res.data._embedded){
            setAttributes(res.data._embedded.productAttributeModelList)
        }})
        openProductModal()
    }

    const closeModal = () => {
        setCurrentProduct(defaultProduct)
        setAttributes([])
        setProductModalOpen(false)
        setImageModalOpen(false)
        reload()
    }

    const openImageModalWithProduct = (id) => {
        setCurrentProduct(products._embedded.productModelList.find(item => item.id === id))
        setImageModalOpen(true);
    }

    const startSearch = () => {
        setCurrentLink(`/products?page=0&size=${500000}&search=${search}`)
    }

    const remove = (id) => {
        axiosAPI.delete(`/products/${id}`).then(() => reload())

    }
    return (
        <div className={"admin-control-main-grid"}>
            {(manufacturers && categories) &&
            <ProductModal isOpen={isProductModalOpen}
                          close={closeModal}
                          categories={categories}
                          manufacturers={manufacturers}
                          currentProduct={currentProduct}
                          attr={attributes}/>
            }
            {<ImageModal isOpen={isImageModalOpen}
                         close={closeModal}
                         currentProduct={currentProduct}/>
            }
            <button className={"admin-control-button"} style={{justifySelf: "left"}}
                    onClick={() => openProductModal()}>Add new...
            </button>
            <div className={"admin-control-search"}>
                <input type={"text"} className={"admin-control-input"} value={search}
                       onChange={e => setSearch(e.target.value)}/>
                <button className={"admin-control-button"} onClick={startSearch}>Search</button>
            </div>
            <table className={"control-table"}>
                <thead>
                <tr>
                    <th>id</th>
                    <th/>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Category</th>
                    <th>Price ($)</th>
                    <th>Stock</th>
                    <th>Popul.</th>
                    <th>Score</th>
                    <th>Options&nbsp;&nbsp;&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                {products && products._embedded &&
                products._embedded.productModelList.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                            <img className={"admin-control-image"}
                                 alt={`product`}
                                 src={item.images.length > 0 ? `http://localhost:8080/images/${item.id}/${item.images[0].filename}` : not_found}/>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.manufacturer.name}</td>
                        <td>{item.category.name}</td>
                        <td>{item.price}</td>
                        <td>{item.amountInStock}</td>
                        <td>{item.popularity}</td>
                        <td>{item.totalScore}</td>
                        <td>
                            <button className={"icon-button"} onClick={() => openProductModalWithProduct(item.id)}><i
                                className="fa fa-edit"/></button>
                            <button className={"icon-button"} onClick={() => openImageModalWithProduct(item.id)}><i
                                className="fa fa-picture-o"/></button>
                            <button className={"icon-button"}><i className="fa fa-trash"
                                                                 onClick={() => remove(item.id)}/></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <button className={"admin-control-button admin-prev-button"} style={{justifySelf: "right"}}
                    onClick={() => setCurrentLink(links.prev)} disabled={links.prev === null}>Previous
            </button>
            <button className={"admin-control-button admin-next-button"} style={{justifySelf: "left"}}
                    onClick={() => setCurrentLink(links.next)} disabled={links.next === null}>Next
            </button>

        </div>
    );
}

export default Products