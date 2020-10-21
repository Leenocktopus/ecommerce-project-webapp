import React, {useEffect, useState} from "react";
import {axiosAPI} from "../../util/axiosConfig";
import OrderModal from "./modal/OrdersModal";


const Orders = () => {
    const defaultLink = "/orders?page=0&size=20";
    const [currentLink, setCurrentLink] = useState(defaultLink);
    const [links, setLinks] = useState({prev: null, next: null});
    const [orders, setOrders] = useState(null);
    const [search, setSearch] = useState("");
    const [isModalOpen, setModalOpen] = useState(false)
    const [order, setOrder] = useState(null)
    const reload = () => {
        axiosAPI.get(currentLink)
            .then(res => setOrders(res.data))
    }

    const startSearch = () => {
        setCurrentLink(`${defaultLink}&search=${search}`)
    }

    useEffect(() => {
        reload()
    }, [currentLink])

    useEffect(() => {
        if (orders) {
            setLinks({
                prev: 'prev' in orders._links ? orders._links.prev.href : null,
                next: 'next' in orders._links ? orders._links.next.href : null
            })
        }
    }, [orders])


    const openModalWithOrder = (id) => {
        setOrder(orders._embedded.orderModelList.find(item => item.id === id))
        setModalOpen(true)
    }

    const changeStatus = (id, e) => {
        const selected = orders._embedded.orderModelList.find(item => item.id === id)
        selected['orderStatus'] = e
        axiosAPI.put(`/orders/${id}/`, selected)
            .then(() => reload())
    }

    return (
        <div className={"admin-control-main-grid"}>
            {order && <OrderModal isOpen={isModalOpen}
                                  close={() => setModalOpen(false)}
                                  order={order}/>}
            <div/>
            <div className={"admin-control-search"}>
                <input type={"text"} className={"admin-control-input"} value={search}
                       onChange={e => setSearch(e.target.value)}/>
                <button className={"admin-control-button"} onClick={startSearch}>Search</button>
            </div>
            <table className={"control-table"}>
                <thead>
                <tr>
                    <th>id</th>
                    <th>Customer Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Options&nbsp;&nbsp;&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                {orders &&
                orders._embedded && orders._embedded.orderModelList.map(item => (
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
                            <button className={"icon-button"} onClick={() => openModalWithOrder(item.id)}><i
                                className="fa fa-search"/></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <button className={"admin-control-button admin-prev-button"} style={{justifySelf: "right"}}
                    onClick={() => setCurrentLink(links.prev)} disabled={links.prev === null}>Previous
            </button>
            <button className={"admin-control-button admin-next-button"} style={{justifySelf: "left"}}
                    onClick={() => setCurrentLink(links.next)} disabled={links.next === null}>Next
            </button>

        </div>
    );

}

export default Orders