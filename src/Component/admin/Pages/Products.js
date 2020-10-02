import React, {useEffect, useState} from "react";
import {axiosAPI} from "../../util/axiosConfig";
import "../../../css/categories-window.css";
import ProductModal from "./modal/ProductModal";

const Products = () =>{
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
    const[products, setProducts] = useState(null);
    const[currentLink, setCurrentLink] = useState("/products?page=0&size=30");
    const[links, setLinks] = useState({prev: null, next: null});
    const[search, setSearch] = useState("");
    const[isModalOpen, setModalOpen] = useState(false);
    const[currentProduct, setCurrentProduct] = useState(defaultProduct);

    const[categories, setCategories] = useState(null);
    const[manufacturers, setManufacturers] = useState(null);

    useEffect(() => {
        axiosAPI.get(currentLink)
            .then(res => {
                setProducts(res.data)
                return res.data})


    }, [currentLink])

    useEffect(() => {
        if (products){
            setLinks({
                prev: 'prev' in products._links ? products._links.prev.href : null,
                next: 'next' in products._links  ? products._links.next.href : null
            })
        }
    }, [products])

    const openModal = ()  =>{
        if (!manufacturers){
            axiosAPI.get('/manufacturers').then(res => setManufacturers(res.data._embedded.manufacturerModelList))
        }
        if (!categories){
            axiosAPI.get('/categories').then(res => setCategories(res.data._embedded.categoryModelList))
        }
        setModalOpen(true);
    }
    const openModalWithProduct = (id) =>{
        setCurrentProduct(products._embedded.productModelList.find(item => item.id === id))
        openModal()
    }

    const closeModal = () =>{
        setCurrentProduct(defaultProduct)
        setModalOpen(false)
    }

    return (
        <div className={"admin-control-main-grid"}>
            {(manufacturers && categories) &&
                <ProductModal isOpen={isModalOpen}
                              close={closeModal}
                              categories={categories}
                              manufacturers={manufacturers}
                              currentProduct={currentProduct}/>
            }
            <button className={"admin-control-button"} style={{justifySelf: "left"}} onClick={() => openModal()}>Add new...</button>
            <div className={"admin-control-search"}>
                <input type={"text"} className={"admin-control-input"} value={search} onChange={e => setSearch(e.target.value)}/>
                <button className={"admin-control-button"}>Search</button>
            </div>
            <table className={"control-table"}>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Category</th>
                        <th>Price ($)</th>
                        <th>Stock</th>
                        <th>Popul.</th>
                        <th>Score</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {products &&
                    products._embedded.productModelList.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.manufacturer.name}</td>
                            <td>{item.category.name}</td>
                            <td>{item.price}</td>
                            <td>{item.amountInStock}</td>
                            <td>{item.popularity}</td>
                            <td>{item.totalScore}</td>
                            <td><button className={"icon-button"}><i className="fa fa-trash"/></button>
                                <button className={"icon-button"} onClick={() => openModalWithProduct(item.id)}><i className="fa fa-edit"/></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className={"admin-control-button admin-prev-button"} style={{justifySelf: "right"}} onClick={() => setCurrentLink(links.prev)}  disabled={links.prev === null}>Previous</button>
            <button className={"admin-control-button admin-next-button"} style={{justifySelf: "left"}} onClick={() => setCurrentLink(links.next)}  disabled={links.next === null}>Next</button>

        </div>
    );
}

export default Products



/*





import React,{Component} from "react";


class Products extends Component{
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }


    onChange = (event) =>{
        const {name, files} = event.target
        this.setState({[name]:files})
        console.log(files)
    }

    onClick = (event) =>{

        for (let i =0; i< this.state.files.length; i++){
            var reader = new FileReader();
            reader.onloadend = function () {
                console.log(reader.result)
            }
            reader.readAsDataURL(this.state.files[i])
        }

    }
    render() {
        return (
            <div>
                <input name={"files"} type={"file"} onChange={this.onChange} multiple accept={"image/!*"}/>
                <button onClick={this.onClick}>Go fuck yourself!</button>
            </div>
        );
    }
}

export default Products*/
