import React, {Component} from "react";
import RecursiveComponent from "./util/RecursiveComponent";
import {axiosAPI} from "../../util/axiosConfig";

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: {},
            newCategory: ""
        }
    }

    onChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    }

    onClick = async () => {
        await axiosAPI.post('/categories', {
                name: this.state.newCategory
            }
        )
        axiosAPI.get('/categories').then(res => this.setState({categories: res.data}))
    }

    componentDidMount() {

        axiosAPI.get('/categories').then(res => this.setState({categories: res.data}))
    }


    render() {

        return (
            <div>
                <br/>
                <input name={"newCategory"} value={this.state.newCategory} type={"text"} onChange={this.onChange}/>
                <button onClick={this.onClick}>Add</button>
                {Object.keys(this.state.categories).length ?
                    <RecursiveComponent progeny={this.state.categories._embedded.categoryModelList}/> :
                    <div>Loading...</div>}
            </div>
        );
    }
}

export default Categories