import React, {useEffect, useState} from "react";
import {axiosAPI} from "../util/axiosConfig";
import Loading from "../util/Loading";
import Product from "./Product";
import PageControl from "../util/PageControl";
import * as qs from "qs";

const ShopPage = () => {
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [manufacturers, setManufacturers] = useState(null);
    const [links, setLinks] = useState({next: null, prev: null});
    const [currentLink, setCurrentLink] = useState("/products?page=0&size=20");
    const [sort, setSort] = useState("popularity,desc");
    const [filterCategory, setFilterCategory] = useState([]);
    const [filterManufacturer, setFilterManufacturer] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        reload()
    }, [currentLink, filterCategory, filterManufacturer, sort])

    useEffect(() => {
        axiosAPI.get('/manufacturers')
            .then(res => setManufacturers(res.data._embedded.manufacturerModelList))
        axiosAPI.get('/categories')
                .then(res => setCategories(res.data._embedded.categoryModelList))
    }, [])

    const reload = () => {
        const cat = filterCategory.filter((item) => item.checked===false);
        const man = filterManufacturer.filter((item) => item.checked===false);
        axiosAPI.get(currentLink, {
            params: {
                f_cat: cat.length === 0 || cat.length === categories.length ? [] : cat.map((item) => item.id),
                f_man: man.length === 0 || man.length === manufacturers.length ? [] : man.map((item) => item.id),
                sort
            }, paramsSerializer: params => {
                return qs.stringify(params, {encode: false, arrayFormat: 'comma'})
            }})
            .then(res => setProducts(res.data))
    }

    useEffect(() => {
        if (products) {
            setLinks({
                prev: 'prev' in products._links ? (products._links.prev.href.includes("sort") ?
                    products._links.prev.href.split("&sort")[0] : products._links.prev.href): null,
                next: 'next' in products._links ? (products._links.next.href.includes("sort") ?
                    products._links.next.href.split("&sort")[0] : products._links.next.href) : null
            })
        }
    }, [products])


    useEffect(() => {
        if (categories && manufacturers){
            setFilterCategory(categories.map(item => ({id: item.id, checked: false})))
            setFilterManufacturer(manufacturers.map(item => ({id: item.id, checked: false})))
        }
    }, [categories, manufacturers])
    console.log(filterCategory)
    console.log(filterManufacturer)

    const addCategoryFilter = (e) => {
        const id = e.target.value
        let cat = filterCategory.length === 0 ? categories.map(item => item.id) : filterCategory;
        if (e.target.checked){
            cat = cat.filter((item) => item!=id)
        } else {
            cat = cat.length +1 === categories.length ?  [] : cat.concat([id])
        }
        setFilterCategory(cat)
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
    }

    const startSearch = () => {
        if(!search){
            setCurrentLink(`/products?page=0&size=24`)
        } else {
            setCurrentLink(`/products?page=0&size=${500000}&search=${search}`)
        }
    }

    const keyListener = (e) => {
        if (e.key === 'Enter'){
            startSearch()
        }
    }
    return (
        <div id={"shop-container"} onKeyPress={(e) => keyListener(e)}>
            <select name="" id="shop-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="price,asc">From cheap to expensive</option>
                <option value="price,desc">From expensive to cheap</option>
                <option value="popularity,desc">Popular products first</option>
                <option value="totalScore,desc">Highest rated products first</option>
            </select>
            <div id={"search-panel"}>
                <input type="text" id={"search-input"} onChange={(e) => setSearch(e.target.value)}/>
                <button id={"shop-search"} onClick={() => startSearch()}>Search</button>
            </div>
            <div id={"filter-panel"}>
                <div className={"filter-name"}>Categories</div>
                <div className={"filter-body"}>
                    {categories && categories.map(item => <div className={"filter-option"} key={item.id}><input type="checkbox" value={item.id} onChange={(e) => {
                        const value = e.target.value
                        const checked = e.target.checked
                        setFilterCategory((current) => current.map((x) => value == x.id ? {
                            ...x,
                            checked
                        } : x))
                    }}/> {item.name}<br/></div> )}
                </div>

                <div className={"filter-name"}>Manufacturers</div>
                <div className={"filter-body"}>
                    {manufacturers && manufacturers.map(item => <div className={"filter-option"} key={item.id}><input type="checkbox" value={item.id} onChange={(e) => {
                        const value = e.target.value
                        const checked = e.target.checked
                        setFilterManufacturer((current) => current.map((x) => value == x.id ? {
                            ...x,
                            checked
                        } : x))
                    }}/> {item.name}<br/></div> )}
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