import React,{Component} from "react";
import {axiosAPI} from "../../util/axiosConfig";


class Manufacturers extends Component{
    constructor(props) {
        super(props);
        this.state = {
            manufacturers: {},
            newManufacturer: ""
        }

    }

    onChange = (event) =>{
        const {name, value} = event.target;
        this.setState({[name]:value})
    }

    onClick = async () =>{
        await axiosAPI.post('/manufacturers',{
                name: this.state.newManufacturer
            }
        )
        axiosAPI.get('/manufacturers').then(res => this.setState({manufacturers:res.data}))
    }
    componentDidMount() {
        axiosAPI.get('/manufacturers').then(res => this.setState({manufacturers:res.data}))
    }

    render() {
        return (
            <div>
                <br/>
                <input type={"text"} name={"newManufacturer"} value={this.state.newManufacturer} onChange={this.onChange}/>
                <button onClick={this.onClick}>Add</button>
                {Object.keys(this.state.manufacturers).length ?
                    this.state.manufacturers._embedded.manufacturerModelList.map(item => (
                        <div key={item.id}>{item.name}</div>
                    ))
                    :<div>Loading...</div>}
            </div>
        );
    }
}

export default Manufacturers