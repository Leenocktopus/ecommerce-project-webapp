import React, {useEffect, useState} from "react";
import {axiosAPI} from "../util/axiosConfig";
import Loading from "../util/Loading";
import Product from "./entity/Product";
import PageControl from "../util/PageControl";
import * as qs from "qs";

const ShopPage = () => {
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [manufacturers, setManufacturers] = useState(null);
    const [links, setLinks] = useState({next: null, prev: null});
    const [currentLink, setCurrentLink] = useState("/products?page=0&size=24");
    const [sort, setSort] = useState("popular");
    const [filterCategory, setFilterCategory] = useState([]);
    const [filterManufacturer, setFilterManufacturer] = useState([]);


    useEffect(() => {
        reload()
    }, [currentLink, filterCategory, filterManufacturer])

    useEffect(() => {
        axiosAPI.get('/manufacturers')
            .then(res => setManufacturers(res.data._embedded.manufacturerModelList))
        axiosAPI.get('/categories')
                .then(res => setCategories(res.data._embedded.categoryModelList))
    }, [])

    const reload = () => {
        axiosAPI.get(currentLink, {
            params: {
                f_cat: filterCategory,
                f_man: filterManufacturer,
            }, paramsSerializer: params => {
                return qs.stringify(params, {encode: false, arrayFormat: 'comma'})
            }})
            .then(res => setProducts(res.data))
    }

    useEffect(() => {
        if (products) {
            setLinks({
                prev: 'prev' in products._links ? products._links.prev.href : null,
                next: 'next' in products._links ? products._links.next.href : null
            })
        }
    }, [products])

    const addCategoryFilter = (e) => {
        const id = e.target.value
        let cat = filterCategory.length === 0 ? categories.map(item => item.id) : filterCategory;
        if (e.target.checked){
            cat = cat.filter((item) => item!=id)
        } else {
            cat = cat.length +1 === categories.length ?  [] : cat.concat([id])
        }
        setFilterCategory(cat)
        /*if (filterManufacturer.length === 0){
            setFilterManufacturer(manufacturers.map(item => item.id))
        }*/
    }

    const addManufacturerFilter = (e) => {
        const id = e.target.value
        let man = filterManufacturer.length === 0 ? manufacturers.map(item => item.id) : filterManufacturer;
        if (e.target.checked){
            man = man.filter((item) => item!=id)
        } else {
            man = man.length +1 === manufacturers.length ?  [] : man.concat([id])
        }
        setFilterManufacturer(man)
        /*if (filterCategory.length === 0){
            setFilterCategory(categories.map(item => item.id))
        }*/

    }



    return (
        <div id={"shop-container"}>
            <select name="" id="shop-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="cheap">From cheap to expensive</option>
                <option value="expensive">From expensive to cheap</option>
                <option value="popular">Popular products first</option>
                <option value="rating">Highest rated products first</option>
            </select>
            <div id={"search-panel"}>
                <input type="text" id={"search-input"}/>
                <button id={"shop-search"}>Search</button>
            </div>
            <div id={"filter-panel"}>
                <div className={"filter-name"}>Categories</div>
                <div className={"filter-body"}>
                    {categories && categories.map(item => <div className={"filter-option"} key={item.id}><input type="checkbox" value={item.id} onChange={(e) => addCategoryFilter(e)}/> {item.name}<br/></div> )}
                </div>

                <div className={"filter-name"}>Manufacturers</div>
                <div className={"filter-body"}>
                    {manufacturers && manufacturers.map(item => <div className={"filter-option"} key={item.id}><input type="checkbox" value={item.id} onChange={(e) => addManufacturerFilter(e)}/> {item.name}<br/></div> )}
                </div>

            </div>
            {products ?<div className={"grid-wrapper"}>
                {products._embedded ?
                    <>
                    <div id={"products-grid"}>
                        {products._embedded.productModelList.map(item => <Product product={item} key={item.id}/>)}
                    </div>
                    <div id={"shop-page-control"}>
                        <PageControl links={links} setCurrentLink={setCurrentLink}/>
                    </div></> :
                    <><h2 id={"no-products"}>Nothing to show</h2><div id={"hint"}>Try different filters or check the store later.</div></>}
            </div> : <Loading/>}


        </div>
    );
}

export default ShopPage