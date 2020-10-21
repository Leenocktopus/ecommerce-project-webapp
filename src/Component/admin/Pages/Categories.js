import React, {useEffect, useState} from "react";
import {axiosAPI} from "../../util/axiosConfig";
import "../../../css/categories-window.css";
import CategoriesModal from "./modal/CategoryModal";

const Categories = () => {
    const defaultCategory = {id: "", name: ""}
    const [categories, setCategories] = useState(null);
    const [error, setError] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(defaultCategory);
    useEffect(() => {
        reload()
    }, [])
    const reload = () => {
        axiosAPI.get('/categories').then(res => setCategories(res.data._embedded.categoryModelList))
    }


    const remove = (id) => {
        axiosAPI.delete(`/categories/${id}`)
            .then(() => reload())
            .then(() => setError(""))
            .catch(() => setError("Can't delete category. Delete products first."))

    }

    const openModal = (id) => {
        setCurrentCategory(categories.find(item => item.id === id))
        setModalOpen(true)

    }
    const closeModal = () => {
        setCurrentCategory(defaultCategory)
        setModalOpen(false)
        reload()
    }

    return (
        <div className={"admin-control-main-grid"}>
            {<CategoriesModal isOpen={isModalOpen}
                              close={closeModal}
                              currentCategory={currentCategory}
                              reload={reload}/>
            }
            <button className={"admin-control-button"} style={{justifySelf: "left"}}
                    onClick={() => setModalOpen(true)}>Add new...
            </button>
            <div/>

            {error ? <div className={"delete-error"}>{error}</div> : <div>&nbsp;</div>}

            <table className={"control-table"}>
                <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {categories && categories.map(item =>
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                            <button className={"icon-button"}><i className="fa fa-edit"
                                                                 onClick={() => openModal(item.id)}/></button>
                            <button className={"icon-button"}><i className="fa fa-trash"
                                                                 onClick={() => remove(item.id)}/></button>
                        </td>
                    </tr>)}

                </tbody>
            </table>
        </div>
    );
}
export default Categories
