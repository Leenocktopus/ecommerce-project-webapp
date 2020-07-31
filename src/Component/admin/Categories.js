import React,{Component} from "react";
import axios from 'axios';

class Categories extends Component{
    constructor(props) {
        super(props);
        this.state = {
            category: ""
        }
    }
    onChange = (event) =>{
        const {name, value} = event.target;
        this.setState({[name]:value})
    }

    onClick = () =>{
        axios.post('/categories',{
                name: this.state.category
            }
        )
    }


    render() {
        return (
            <div>
                <br/>
                <input name={"category"} value={this.state.category} type={"text"} onChange={this.onChange}/>
                <br/>
                <button onClick={this.onClick}>Add</button>
            </div>
        );
    }
}

export default Categories