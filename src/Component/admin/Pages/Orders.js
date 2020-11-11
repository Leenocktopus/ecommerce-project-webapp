import React, {useEffect, useState} from "react";
import {axiosAPI} from "../../util/axiosConfig";
import OrderModal from "./modal/OrdersModal";
import Order from "./entity/Order";
import PageControl from "../../util/PageControl";


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
        <div className={"admin-window-main-grid"}>
            {order && <OrderModal isOpen={isModalOpen}
                                  close={() => setModalOpen(false)}
                                  order={order}/>}
            <div/>
            <div className={"right-top-grid"}>
                <input type={"text"} className={"admin-control-input"} value={search}
                       onChange={e => setSearch(e.target.value)}/>
                <button className={"admin-button"} onClick={startSearch}>Search</button>
            </div>
            <table className={"entity-table"}>
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
                orders._embedded && orders._embedded.orderModelList.map(item => <Order order={item}
                                           openModalWithOrder={openModalWithOrder}
                                           changeStatus={changeStatus}
                />)}
                </tbody>
            </table>

            <PageControl links={links} setCurrentLink={setCurrentLink}/>
        </div>
    );

}

export default Orders