import React, {Component} from "react";
import './../../css/product-page.css'
import ProductInfo from "../Api/ProductInfo";

import Attributes from "../Api/Attributes";
import Comments from "../Api/Comments";
import axios from "axios";

class ProductPage extends Component {


    constructor(props) {
        super(props);
        this.addComment = this.addComment.bind(this);
        this.setScore = this.setScore.bind(this);
        this.state = {
            product: {},
            attributes: [],
            comments: [],
            score: 0
        };
    }


    componentDidMount() {

        axios.get(`/products/${this.props.match.params.id}`)
            .then(res => {
                const product = res.data;
                this.setState({product})
            });
        axios.get(`/products/${this.props.match.params.id}/attributes`)
            .then(res => {
                const attributes = res.data;
                this.setState({attributes})
            });
        axios.get(`/products/${this.props.match.params.id}/comments`)
            .then(res => {
                const comments = res.data;
                this.setState({comments})
            });
    }

    addComment(event) {
        event.preventDefault();
        const body = {
            "user": this.user.value,
            "text": this.text.value,
            "date": new Date().toISOString().slice(0, 19),
            "score": this.state.score,
            "product": {
                "productId": this.props.match.params.id
            }
        };
        axios.post(`/products/${this.props.match.params.id}/comments`, body)
            .then(res => {
                const comments = res.data;
                this.setState({comments})
            });
        var x = document.getElementById("comment-bar");
        x.className = "show";
        setTimeout(function () {
            x.className = x.className.replace("show", "");
        }, 3000);

    };

    setScore(event) {

        const score = event.target.value;
        this.setState({score})
    }


    render() {
        return (
            <div>
                <div id="snackbar">Товар додано в кошик.</div>
                <div id="comment-bar">Коментар додано.</div>
                <div className="container">
                    <ProductInfo product={this.state.product}/>
                </div>
                <div className="container">
                    <Attributes attributes={this.state.attributes}/>
                </div>
                <div className="container">
                    <div className="comment-section">
                        <div>
                            <h1>Залиште відгук</h1>
                            <form onSubmit={this.addComment}>
                                <label htmlFor="comment-user">Ваше ім'я:</label>
                                <br/>
                                <input id="comment-user" type="text" required="required" ref={(ref) => {
                                    this.user = ref
                                }}/>
                                <br/>
                                <label htmlFor="comment-text">Відгук:</label>
                                <br/>
                                <textarea id="comment-text" rows="4" ref={(ref) => {
                                    this.text = ref
                                }}/>
                                <br/>
                                <label>Оцініть товар: </label>
                                <span className="star-rating star-5" onChange={this.setScore}>
                                      <input type="radio" name="rating" value="1" required={"required"}/><i/>
                                      <input type="radio" name="rating" value="2" required={"required"}/><i/>
                                      <input type="radio" name="rating" value="3" required={"required"}/><i/>
                                      <input type="radio" name="rating" value="4" required={"required"}/><i/>
                                      <input type="radio" name="rating" value="5" required={"required"}/><i/>
                                    </span>

                                <button id="add-сomment-button">Надіслати</button>
                            </form>
                        </div>

                        <Comments comments={this.state.comments}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductPage;