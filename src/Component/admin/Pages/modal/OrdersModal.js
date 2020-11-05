import React from "react";
import Modal from "react-modal";
import not_found from "../../../../styles/images/not_found.png"

const OrderModal = (props) => {
    const {isOpen, close, order} = props;
    return (
        <Modal style={{
            overlay: {},
            content: {
                borderRadius: 10,
                padding: 0,
                height: "60%",
                width: "45%",
                margin: "auto",
                boxShadow: "0 1px 15px rgba(64,64,64,.7)",
            }
        }}
               appElement={document.getElementById('root')} isOpen={isOpen} /*onRequestClose={close}*/>
            <div className={"modal-container"}>
                <h2>{`Order №${order.id}`}</h2>
                <div>
                    {order.products.map(item =>
                        <div className={"admin-product-card"}>
                            <img alt={`product`}
                                 src={item.product.images.length > 0 ? `http://localhost:8080/images/${item.product.id}/${item.product.images[0].filename}` : not_found}/>
                            <div><b>Name:</b> {item.product.name}</div>
                            <div><b>Quantity:</b> {item.quantity}</div>
                            <div><b>Price:</b> {item.product.price}$</div>
                            <div><b>SubTotal:</b> {item.product.price * item.quantity}$</div>
                        </div>)}
                    <div className={"admin-order-total"}>
                        <b>Total: </b> {order.products.map(item => item.quantity * item.product.price).reduce((x, y) => x + y, 0)}$
                    </div>
                    <div className={"admin-order-cancel"}>
                        <button className={"admin-button"} onClick={close}>Close</button>
                    </div>

                </div>
            </div>

        </Modal>
    );
}
export default OrderModal