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


    console.log(index)

    return (
        <div id={"slider"}>
            {images ?
                <>
                <button id={"left-button"}
                        disabled={!images._embedded || index <= 0}
                        onClick={() => setIndex(index - 1)}>&lsaquo;</button>
                <img id={"slider-image"}
                           alt={"product"}
                           src={images._embedded && images._embedded.imageModelList.length > 0 ?
                               images._embedded.imageModelList[index]._links.static.href :
                               not_found}/>
                <button id={"right-button"}
                        disabled={!images._embedded || index >= images._embedded.imageModelList.length - 1}
                        onClick={() => setIndex(index + 1)}>&rsaquo;</button>
                </>
                : <Loading/>}
        </div>
    );
}
export default Slider