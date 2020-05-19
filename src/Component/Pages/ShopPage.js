import React, {Component} from "react";

import './../../css/shop-page.css'
import Products from "../Api/Products";
import axios from 'axios';

class ShopPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            manufacturers: [],
            categories: [],
            products: [],
            filterManufacturer: [],
            filterCategory: [],
            page: 1,
            sort: "",
            changeTimeout: 0
        };
        this.search = this.search.bind(this);
        this.sortProducts = this.sortProducts.bind(this);
        this.filterProducts = this.filterProducts.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }

    componentDidMount() {
        axios.get("/manufacturers")
            .then(res => {
                const manufacturers = res.data;
                this.setState({manufacturers})
            });
        axios.get("/categories")
            .then(res => {
                const categories = res.data;
                this.setState({categories})
            });
        axios.get("/products?sort=totalScore,desc")
            .then(res => {
                const products = res.data;
                this.setState({products})
            });
    }

    search(event) {
        event.preventDefault();
        if (this.state.changeTimeout) {
            clearTimeout(this.state.changeTimeout)
        }
        setTimeout(() => {
            if (this.keyword.value) {
                axios.get(`/products?key=${this.keyword.value}&sort=totalScore,desc`)
                    .then(res => {
                        const products = res.data;
                        this.setState({products})
                    });
            } else {
                axios.get("/products?sort=totalScore,desc")
                    .then(res => {
                        const products = res.data;
                        this.setState({products})
                    });
            }
        }, 1000);

    }


    filterProducts(event) {
        const filterCategory = this.state.filterCategory;
        const filterManufacturer = this.state.filterManufacturer;
        if (event.target.checked) {
            if (event.target.value[0] === "c") {
                filterCategory.push(event.target.value.substr(1));
            }
            if (event.target.value[0] === "m") {
                filterManufacturer.push(event.target.value.substr(1));
            }

        } else {
            if (event.target.value[0] === "c") {
                filterCategory.splice(filterCategory.indexOf(event.target.value.substr(1)), 1);
            }
            if (event.target.value[0] === "m") {
                filterManufacturer.splice(filterManufacturer.indexOf(event.target.value.substr(1)), 1);
            }
        }
        this.setState({filterCategory});
        this.setState({filterManufacturer});
        this.urlCreator();


    }

    urlCreator() {
        let base = "/products?";
        base = base.concat(`sort=${this.state.sort}`);
        base = base.concat(`&page=${this.state.page}`);
        if (this.state.filterManufacturer.length > 0) {
            base = base.concat("&");
            base = base.concat("man=");
            base = base.concat(this.state.filterManufacturer.join(","));
        }
        if (this.state.filterCategory.length > 0) {
            base = base.concat("&");
            base = base.concat("cat=");
            base = base.concat(this.state.filterCategory.join(","));
        }

        axios.get(base)
            .then(res => {
                const products = res.data;
                this.setState({products})
            });
    }

    sortProducts(event) {
        event.preventDefault();
        const sort = this.sort.value;
        this.setState({sort});
        this.urlCreator();

    }

    nextPage(event) {
        event.preventDefault();
        const page = this.state.page + 1;
        this.setState({page});
        this.urlCreator()
    }

    prevPage(event) {
        event.preventDefault();
        const page = this.state.page - 1;
        this.setState({page});
        this.urlCreator();
    }


    render() {
        return (
            <div>

                <div className="container">
                    <div id="shop-grid">
                        <form id="sort">

                            <select id="sort-select" ref={(ref) => {
                                this.sort = ref
                            }} onChange={this.sortProducts}>
                                <option value={"price,desc"}> Від дорогих до дешевих</option>
                                <option value={"price,asc"}> Від дешевих до дорогих</option>
                                <option value={"totalScore,desc"} selected="selected"> За рейтингом</option>
                            </select>
                        </form>


                        <form id="search">
                            <input id="search-field" type="text" placeholder="Знайти товар.." ref={(ref) => {
                                this.keyword = ref
                            }} onChange={this.search}/>

                        </form>

                        <form id="filter">
                            <input id="tab-nav" type="checkbox" className="tab-nav" name="tabs"/>
                            <label htmlFor="tab-nav" className="tab-nav-label">Фільтр<span> &#8616;</span></label>
                            <div id="filter-content">

                                <div>
                                    <h3>Categories</h3>
                                    <ul id="chekboxes-category">
                                        {this.state.categories.map((category) => (
                                            <li>
                                                <label>
                                                    <input type="checkbox" value={"c" + category.id}
                                                           onChange={this.filterProducts}/> {category.name}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3>Manufacturers</h3>
                                    <ul id="chekboxes-manufacturer">
                                        {this.state.manufacturers.map((manufacturer) => (
                                            <li><label><input type="checkbox" value={"m" + manufacturer.id}
                                                              onChange={this.filterProducts}/> {manufacturer.name}
                                            </label></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </form>
                        <Products products={this.state.products} addToCart={this.props.componentDidMount}/>
                        <div/>
                        <div style={{textAlign: "center"}}>

                            <button style={{float: "none"}} onClick={this.prevPage}>&#8592;</button>
                            <button style={{float: "none"}} onClick={this.nextPage}>&#8594;</button>
                        </div>
                    </div>

                </div>
                <div className="container">

                </div>
            </div>
        );
    }
}

export default ShopPage;