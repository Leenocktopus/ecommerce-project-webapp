import React, {useEffect, useState} from "react";
import {axiosAPI} from "../util/axiosConfig";
import Loading from "../util/Loading";


const Comments = ({url}) => {
    const [comments, setComments] = useState();
    useEffect(() => {
        axiosAPI.get(url).then(res => setComments(res.data))
    }, [])

    return (
        <div>
            {comments ? (comments._embedded ? comments._embedded.productCommentModelList.map(item =>
                <div key={item.id}>
                    <div>{item.user}</div>
                    <div>{item.text}</div>

                </div>
            ) : <div>Comments are Empty</div>) : <Loading/>}
        </div>
    )
}
export default Comments