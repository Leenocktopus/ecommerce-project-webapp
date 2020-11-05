import React, {useEffect, useState} from "react";
import {axiosAPI} from "../../util/axiosConfig";
import CategoriesModal from "./modal/CategoryModal";
import Category from "./entity/Category";

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
        <div className={"admin-window-main-grid"}>
            {<CategoriesModal isOpen={isModalOpen}
                              close={closeModal}
                              currentCategory={currentCategory}
                              reload={reload}/>
            }
            <button className={"admin-button left-top-grid"}
                    onClick={() => setModalOpen(true)}>Add new...
            </button>
            <div/>

            {error ? <div className={"admin-div-error"}>{error}</div> : <div>&nbsp;</div>}

            <table className={"entity-table"}>
                <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {categories && <Category categories={categories} openModal={openModal} remove={remove}/>}
                </tbody>
            </table>
        </div>
    );
}
export default Categories
