import React, {Component, useEffect, useState} from "react";
import {axiosAPI} from "../../util/axiosConfig";

const Manufacturers = () => {
    const[manufacturers, setManufacturers] = useState(null);
    const[newManufacturer, setNewManufacturer] = useState("");

    useEffect(() => {
        axiosAPI.get('/manufacturers').then(res => setManufacturers(res.data))
    })

    const onClick = async () => {
        await axiosAPI.post('/manufacturers', {
                name: newManufacturer
            }
        )
        axiosAPI.get('/manufacturers').then(res => setManufacturers(res.data))
    }

    return (
        <div>
            <br/>
            <input type={"text"} name={"newManufacturer"} value={newManufacturer}
                   onChange={e => setNewManufacturer(e.target.value)}/>
            <button onClick={onClick}>Add</button>
            {manufacturers ? manufacturers._embedded.manufacturerModelList.map(item => (
                    <div key={item.id}>{item.name}</div>
                ))
                : <div>Loading...</div>}
        </div>
    );
}

export default Manufacturers