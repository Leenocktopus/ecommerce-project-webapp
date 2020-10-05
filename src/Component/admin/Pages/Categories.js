import React, {useEffect, useState} from "react";
import {axiosAPI} from "../../util/axiosConfig";
import "../../../css/categories-window.css";
const Categories = () =>{
    const[categories, setCategories] = useState(null);
    const[newCategory, setNewCategory] = useState("");
    const[parent, setParent] = useState(null);
    useEffect(() => {

        axiosAPI.get('/categories').then(res => setCategories(res.data))
    }, [])

    const onClick = async () => {
        await axiosAPI.post('/categories', {
                name: newCategory,
                parent
            }
        )
        axiosAPI.get('/categories').then(res => this.setState({categories: res.data}))
    }
    const toFlatArray = (values) =>{
        values.map(item => {
            let result = []
            while (item.subCategories.length !== 0){
                result.push(item)
                item = item.subCategories
            }
        })
    }

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <td>id</td>
                    <td>name</td>
                    <td>parent</td>
                </tr>
                </thead>
                <tbody>
                {categories && categories._embedded.categoryModelList.flat().map(item => (
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default Categories

/*
<div>
<br/>
<input name={"newCategory"} value={newCategory.name} type={"text"} onChange={e => setNewCategory(e.target.value)}/>
<button onClick={onClick}>Add</button>
{categories ?
    <Category progeny={categories._embedded.categoryModelList} level={0}/> :
    <div>Loading...</div>}
</div>*/
