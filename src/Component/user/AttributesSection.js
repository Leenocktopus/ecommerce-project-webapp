import React, {useEffect, useState} from "react";
import {axiosAPI} from "../util/axiosConfig";
import Loading from "../util/Loading";

const AttributesSection = ({url}) => {
    const [attributes, setAttributes] = useState(null);

    useEffect(() => {
        axiosAPI.get(url).then(res => setAttributes(res.data))
    }, [])
    return(
        <div>
            {attributes ? (attributes._embedded ? attributes._embedded.productAttributeModelList.map(item =>
                <div key={item.id}>
                    <div>{item.name}</div>
                    <div>{item.value}</div>

                </div>
            ) : <div>Attributes are empty</div>) : <Loading/>}
        </div>
    )
}
export default AttributesSection