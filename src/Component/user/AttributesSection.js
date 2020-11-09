import React, {useEffect, useState} from "react";
import {axiosAPI} from "../util/axiosConfig";
import Loading from "../util/Loading";

const AttributesSection = ({url}) => {
    const [attributes, setAttributes] = useState(null);

    useEffect(() => {
        axiosAPI.get(url).then(res => setAttributes(res.data))
    }, [])
    return (
        <div id={"product-attributes-container"}>
            <h4>Item specifics</h4>
            {attributes ? (attributes._embedded ?
                <table id={"product-attributes-table"}>
                <thead/>
                <tbody >
                {attributes._embedded.productAttributeModelList.map(item =>
                    <tr key={item.id}>
                        <td className={"attr-name"}>{item.name}:</td>
                        <td>{item.value}</td>
                    </tr>
                )}</tbody>
            </table> :
                <div>Attributes are empty</div>) : <Loading/>}

        </div>
    )
}
export default AttributesSection