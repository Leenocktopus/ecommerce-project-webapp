import React, {useEffect, useState} from "react";
import {axiosAPI} from "../util/axiosConfig";
import Loading from "../util/Loading";
import Product from "./entity/Product";
import PageControl from "../admin/Pages/PageControl";

const ShopPage = () => {
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [manufacturers, setManufacturers] = useState(null);
    const [links, setLinks] = useState({next: null, prev: null});
    const [currentLink, setCurrentLink] = useState("/products?page=0&size=24");


    useEffect(() => {
        reload()
    }, [currentLink])

    const reload = () => {
        axiosAPI.get(currentLink)
            .then(res => setProducts(res.data))
    }

    useEffect(() => {
        axiosAPI.get('/manufacturers').then(res => setManufacturers(res.data._embedded.manufacturerModelList))
        axiosAPI.get('/categories').then(res => setCategories(res.data._embedded.categoryModelList))
    }, [])

    useEffect(() => {
        if (products) {
            setLinks({
                prev: 'prev' in products._links ? products._links.prev.href : null,
                next: 'next' in products._links ? products._links.next.href : null
            })
        }
    }, [products])

    return (
        <div id={"shop-container"}>
            <select name="" id="shop-sort">
                <option value="cheap">From cheap to expensive</option>
                <option value="expensive">From expensive to cheap</option>
                <option value="popular" selected>Popular products first</option>
                <option value="rating">Highest rated products first</option>
            </select>
            <div id={"search-panel"}>
                <input type="text" id={"search-input"}/>
                <button id={"shop-search"}>Search</button>
            </div>
            <div id={"filter-panel"}>
                <div className={"filter-name"}>Categories</div>
                <div className={"filter-body"}>
                    {categories && categories.map(item => <div className={"filter-option"}><input type="checkbox"/> {item.name}<br/></div> )}
                </div>

                <div className={"filter-name"}>Manufacturers</div>
                <div className={"filter-body"}>
                    {manufacturers && manufacturers.map(item => <div className={"filter-option"}><input type="checkbox"/> {item.name}<br/></div> )}
                </div>
                <button id={"shop-apply-filters"}>Apply filters</button>

            </div>
            <div className={"grid-wrapper"}>
                <div id={"products-grid"}>
                    {products ?
                        (products._embedded ?
                            products._embedded.productModelList.map(item => <Product product={item}/>) :
                            <div id={"no products"}>Nothing to show</div>)
                        : <Loading/>}
                </div>
                <div id={"shop-page-control"}>
                    <PageControl links={links} setCurrentLink={setCurrentLink}/>
                </div>
            </div>


        </div>
    );
}

export default ShopPage