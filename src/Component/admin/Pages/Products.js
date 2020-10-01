import React, {Component} from "react";
import {axiosAPI} from "../../util/axiosConfig";


class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: {}
        }
    }


    onChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    }


    componentDidMount() {
        axiosAPI.get('/products').then(res => this.setState({products: res.data}))
    }

    next() {

    }

    prev() {

    }

    render() {
        return (
            <div>
                <br/>
                {Object.keys(this.state.products).length ?
                    this.state.products._embedded.productModelList.map(item => (
                        <div key={item.id}>
                            <div>{item.name}</div>
                            <div>{item.price}</div>
                            <br/>
                        </div>
                    ))

                    : <div>Loading...</div>}
            </div>
        );
    }
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
