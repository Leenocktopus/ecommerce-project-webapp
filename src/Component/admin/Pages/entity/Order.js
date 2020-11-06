import React from "react";

const Order = ({order, openModalWithOrder, changeStatus}) => {
    return (
        <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.customerName}</td>
            <td>{order.customerPhone}</td>
            <td>{order.customerEmail}</td>
            <td>{new Date(order.date).toLocaleString("en-US")}</td>
            <td>
                <select value={order.orderStatus} onChange={(e) => changeStatus(order.id, e.target.value)}>
                    <option className={"admin-order-status-pending"}>PENDING</option>
                    <option className={"admin-order-status-completed"}>COMPLETED</option>
                    <option className={"admin-order-status-cancelled"}>CANCELLED</option>
                </select>
            </td>
            <td>
                <button className={"admin-icon-button"} onClick={() => openModalWithOrder(order.id)}><i
                    className="fa fa-search"/></button>
            </td>
        </tr>
    )
}
export default Order