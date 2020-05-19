import React, {Component} from "react";


class Comments extends Component {


    render() {
        const data = this.props.comments;
        return (
            <div className="comment-container">
                <h1>Всі відгуки</h1>

                {data.map(function (comment) {
                    return (
                        <div className="comment">

                            <h3>{comment.user}<span>{new Intl.DateTimeFormat("ru").format(Date.parse(comment.date))}</span>
                            </h3>
                            <div className="star-rating comment">
                                <i style={{width: `${comment.score * 20}%`}}/>
                            </div>
                            <p>{comment.text}</p>
                        </div>
                    );
                })}
            </div>
        );
    }

}

export default Comments;