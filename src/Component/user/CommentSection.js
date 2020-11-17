import React, {useEffect, useState} from "react";
import {axiosAPI} from "../util/axiosConfig";
import Loading from "../util/Loading";
import PageControl from "../util/PageControl";


const Comments = ({url, key, setKey}) => {
    const [comments, setComments] = useState();
    const [author, setAuthor] = useState("");
    const [text, setText] = useState("");
    const [score, setScore] = useState(0);
    const [currentLink, setCurrentLink] = useState(`${url}?page=0&size=10&sort=date,desc`);
    const [links, setLinks] = useState({prev: null, next: null});

    const [authorError, setAuthorError] = useState("");
    const [scoreError, setScoreError] = useState("");
    const [commentError, setCommentError] = useState("");

    useEffect(() => {
        reload()
    }, [currentLink])

    const reload = () => {
        axiosAPI.get(currentLink).then(res => setComments(res.data))
    }

    useEffect(() => {
        if (comments) {
            setLinks({
                prev: 'prev' in comments._links ? comments._links.prev.href : null,
                next: 'next' in comments._links ? comments._links.next.href : null
            })
        }
    }, [comments])

    const addReview = () => {
        if (author === "") {
            setAuthorError("Please, enter your name")
        } else if (comments._embedded && comments._embedded.productCommentModelList.filter(comment => comment.user === author).length !== 0) {
            setAuthorError("There is a review from this author already")
        } else {
            setAuthorError("")
        }

        if (score === 0) {
            setScoreError("Please, rate the product");
        } else {
            setScoreError("")
        }

        if(text.length > 500){
            setCommentError("Review text is too long");
        } else {
            setCommentError("")
        }
        if (!authorError && !scoreError && !commentError) {
            axiosAPI.post(url,
                {
                    user: author,
                    text,
                    score
                })
                .then(() => setScore(0))
                .then(() => setText(""))
                .then(() => setAuthor(""))
                .then(() => reload())
                .then(() => setKey(Math.random()))
        }

    }

    return (
        <div id={"product-comments-container"}>
            <div id={"comment-form"}>
                <label htmlFor="comment-author">Enter your name: </label>
                <div><input id={"comment-author"} type="text" value={author}
                            onChange={(e) => setAuthor(e.target.value)}/><br/>
                {authorError ? <span id={"author-error"}>{authorError}</span> : <span id={"author-error"}>&nbsp;</span>}</div>
                <label htmlFor="comment-area">Enter your review: </label>{commentError ? <span id={"comment-error"}>{commentError}</span> : <span id={"comment-error"}>&nbsp;</span>}<br/>
                <textarea id="comment-area" cols="60" rows="7" value={text} onChange={(e) => setText(e.target.value)}/>
                <div>
                    {scoreError ? <span id={"score-error"}>{scoreError}</span> : <span id={"score-error"}>&nbsp;</span>}
                </div>
                <span id={"comment-rate"}>Rate the product:
                 <span key={key} className="star-rating star-5" onChange={(e) => setScore(e.target.value)}>
                     {[...Array(5).keys()].map(item =>
                         <><input key={item} type="radio" name="rating" value={item + 1}/><i/></>
                     )}
                 </span>

                <button id={"add-comment"} onClick={() => addReview()}>Add review</button>
                </span>
            </div>
            <div id={"comments-section"}>
                <h4>Reviews</h4>
                {comments ? (comments._embedded ? <> {comments._embedded.productCommentModelList.map(item =>

                    <div className={"comment-body"} key={item.id}>
                        <div className={"author"}>{item.user}
                            <div
                                className={"date"}>{new Intl.DateTimeFormat("en").format(Date.parse(item.date))}</div>

                            <div className="star-rating comment">
                                <i style={{width: `${100 * item.score / 5}%`}}/>
                            </div>
                        </div>
                        <div className={"text"}>{item.text}</div>

                    </div>)}
                    <div id={"comments-page-control"}>
                        <PageControl links={links} setCurrentLink={setCurrentLink}/>
                    </div>
                </> : <div id={"no-reviews"}>No reviews</div>) : <Loading/>}


            </div>
        </div>
    )
}
export default Comments