import React,{Component} from "react";



class RecursiveComponent extends Component{

    constructor(props) {
        super(props);
        this.state ={
            expand: false
        }
    }

    expand = () =>{
        this.setState({expand:!this.state.expand})
    }

    render() {
        return (
            <div>
                {this.props.progeny.map(item =>
                    <div key={item.id}>
                        <div>{item.name} {item.subCategories.length!==0 && <button onClick={this.expand}>{this.state.expand ? "-": "+"}</button>}</div>
                    {this.state.expand && <RecursiveComponent progeny={item.subCategories}/>}
                    </div>
                )}
            </div>
        );
    }
}

export default RecursiveComponent

