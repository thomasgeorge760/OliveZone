import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { allOrders, clearErrors, deleteOrder } from '../../actions/orderActions';
import Sidebar from './Sidebar';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';

const OrdersList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { user, isAuthenticated } = useSelector(state => state.auth);
    const { isDeleted } = useSelector(state => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }


    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            alert.error(error);

            dispatch(clearErrors())
        }

        if(isDeleted) {
            alert.success('Order deleted successfully');
            navigate('/admin/orders');
            dispatch({
                type: DELETE_ORDER_RESET
            })
        }


    }, [dispatch, alert, error, isDeleted, navigate])

    return (
        <Fragment>

            {isAuthenticated && user.role === 'admin' ? (
                <Fragment>

                    <MetaData title={'All orders'} />

                    <div className="row">
                        <div className="col-12 col-md-3 col-lg-2">
                            <Sidebar />
                        </div>

                        <div className="col-12 col-md-9 col-lg-10">
                            <h1 className="my-4">All Orders</h1>

                            {loading ? <Loader /> : (
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Order ID</th>
                                            <th scope="col">Number of Items</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {orders && orders.map(order => {
                                            return (<tr key={order._id}>
                                                <th scope="row">{order._id}</th>
                                                <td>{order.orderItems.length}</td>
                                                <td>{order.totalPrice}</td>
                                                <td>{order.orderStatus && String(order.orderStatus).includes('Delivered')
                                                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                                                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>}</td>
                                                <td>{
                                                    <Fragment>
                                                        <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2" >
                                                            <i className="fa fa-eye"></i>
                                                        </Link>
                                                        <button className="btn btn-danger py-1 px-2 ms-2" onClick={()=>{deleteOrderHandler(order._id)}} >
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </Fragment>
                                                }</td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </table>

                            )}
                        </div>
                    </div>



                </Fragment>
            ) : (
                navigate('/')
            )}

        </Fragment>
    )
}

export default OrdersList
