import React, {useEffect, useState} from "react";
import not_found from "./../../styles/images/not_found.png"
import {axiosAPI} from "../util/axiosConfig";
import Loading from "../util/Loading";

const Slider = ({url}) => {
    const [images, setImages] = useState()
    const [index, setIndex] = useState(0);

    useEffect(() => {
        axiosAPI.get(url).then(res => setImages(res.data))

    }, [])
    return (
        <div>
            <button id={"left-button"}/>
            {images ? <img className={"product-card-image"}
                           alt={"product"}
                           src={images._embedded && images._embedded.imageModelList.length > 0 ?
                               images._embedded.imageModelList[index]._links.static.href :
                               not_found}/>
                : <Loading/>}
            <button id={"right-button"}/>
        </div>
    );
}
export default Slider