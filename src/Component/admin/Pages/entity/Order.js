import React from "react";

const Order = (props) => {
    const {orders, openModalWithOrder, changeStatus} = props;

    return (
        <>
            {orders.map(item => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.customerName}</td>
                    <td>{item.customerPhone}</td>
                    <td>{item.customerEmail}</td>
                    <td>{new Date(item.date).toLocaleString("en-US")}</td>
                    <td>
                        <select value={item.orderStatus} onChange={(e) => changeStatus(item.id, e.target.value)}>
                            <option className={"admin-order-status-pending"}>PENDING</option>
                            <option className={"admin-order-status-completed"}>COMPLETED</option>
                            <option className={"admin-order-status-cancelled"}>CANCELLED</option>
                        </select>
                    </td>
                    <td>
                        <button className={"admin-icon-button"} onClick={() => openModalWithOrder(item.id)}><i
                            className="fa fa-search"/></button>
                    </td>
                </tr>
            ))}
        </>

    )

}
export default Order