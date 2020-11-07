import React, {useEffect, useState} from "react";
import not_found from "./../../styles/images/not_found.png"
import {axiosAPI} from "../util/axiosConfig";
import Loading from "../util/Loading";

const Slider = ({id}) => {
    const [images, setImages] = useState()
    const [index, setIndex] = useState(0);

    useEffect(() => {
        axiosAPI.get(`/products/${id}/images`).then(res => setImages(res.data))

    }, [])
    return (
        <div>
            {images ? <img className={"product-card-image"}
                           alt={"product"}
                           src={images._embedded && images._embedded.imageModelList.length > 0 ?
                               `http://localhost:8080/images/${id}/${images._embedded.imageModelList[index].filename}` :
                               not_found}/>
                : <Loading/>}
            <button id={"left-button"}/>
            <img/>
            <button id={"right-button"}/>
        </div>
    );
}
export default Slider