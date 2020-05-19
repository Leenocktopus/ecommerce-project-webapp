import React, {Component} from "react";


class Attributes extends Component {

    render() {
        const data = this.props.attributes;
        return (
            <div id="attributes-wrapper">
                <h3>Характеристики</h3>
                <div id="attributes-grid">
                    {data.map(function (attribute) {
                        return (
                            <div>{attribute.name}: {attribute.value}</div>);
                    })}
                </div>
            </div>
        );
    }


}

export default Attributes;