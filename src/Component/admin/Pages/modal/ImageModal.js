import React, {useEffect, useRef, useState} from "react";
import Modal from "react-modal";
import plus_image from "../../../../css/61183.png";
import {axiosAPI} from "../../../util/axiosConfig";
const ImageModal = ({isOpen, close, reload, currentProduct, ...otherProps}) => {
    const fileField = useRef();
    const[images, setImages] = useState(null);
    const[mainImage, setMainImage] = useState(null);
    const[product, setProduct] = useState(null);
    useEffect( () => {
        setImages(currentProduct.images)
        setMainImage(currentProduct.images[0])
        setProduct(currentProduct.id)
    }, [currentProduct])

    const saveImages = () =>{
        const imagesToDelete = currentProduct.images.filter(image => !images.includes(image))
        const imagesToAdd = images.filter(image => !currentProduct.images.includes(image))

        imagesToDelete.forEach((item, index) =>
            axiosAPI.delete(`/products/${product}/images/${item.id}`)
            .then(() => index === imagesToDelete.length-1 && imagesToAdd.length===0 && close()), )

        for (let i = 0; i < imagesToAdd.length; i++) {
            let reader = new FileReader();
            reader.onloadend =  (e) => {
                axiosAPI.post(`products/${product}/images`, {
                    encodedImage: e.target.result.split(",")[1]
                }).then(() => i === imagesToAdd.length-1 && close())
            }
            reader.readAsDataURL(imagesToAdd[i].blob)
        }


    }

    const loadImages = (e) =>{
        const{files} = e.target;
        setImages(images.concat(Array.from(files).map((file, index) => ({
            id: index+file.name+(Math.random()/file.size*file.lastModified)/Date.now(),
            image: URL.createObjectURL(file),
            blob: file
        }))))
    }

    useEffect(() => {
        if (!mainImage && images){
            setMainImage(images[0])
        }
    }, [images])

    const removeImage = (id) =>{
        setImages(images.filter(item => !(item.id ===id)))
        if (mainImage.id === id){
            setMainImage(null)
        }
    }
    return (
        <Modal style={{
            overlay: {
            },
            content: {
                borderRadius: 10,
                padding: 0,
                height: "80%",
                width: "540px",
                margin: "auto",
                boxShadow: "0 1px 15px rgba(64,64,64,.7)",
            }
        }}
               appElement={document.getElementById('root')} isOpen={isOpen} /*onRequestClose={close}*/>
            <div className={"image-modal"} >
                <div className={"images-grid"}>
                    {(images && images.length > 0 && mainImage) &&
                        <>
                        <img className={"image-modal-main-image"} src={
                            'filename' in mainImage ? `http://localhost:8080/images/${product}/${mainImage.filename}` : mainImage.image}/>
                        {images.map( (item, index) => (
                            <div>
                                <button className={"image-modal-delete-button"} onClick={() => removeImage(item.id)}><i className="fa fa-times"/></button>
                                <img key={item.id}
                                     className={"image-modal-secondary-image"}
                                     src={'filename' in item ? `http://localhost:8080/images/${product}/${item.filename}` :
                                         item.image}
                                     alt={`image ${index}`}
                                     onClick={() => setMainImage(images[index])}
                                />
                            </div>

                        ))}
                        </>



                    }
                    <button className={"image-modal-add-button"}>
                        <input ref={fileField} name={"files"} type={"file"} onChange={loadImages} multiple accept={"image/*"} style={{display: "none"}}/>
                        <img className={"image-modal-secondary-image"} onClick={() => fileField.current.click()} src={plus_image}/>
                    </button>
                    </div>
                <button className={"admin-control-button left-bottom-grid"} onClick={close}>Close</button>
                <button className={"admin-control-button right-bottom-grid"} onClick={saveImages}>Save</button>
            </div>

        </Modal>
    );
}
export default ImageModal