import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';

import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader'
import { myOrders, clearErrors } from '../../actions/orderActions';

const ListOrders = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, orders } = useSelector(state => state.myOrders);
    const { isAuthenticated } = useSelector(state => state.auth)


    useEffect(() => {
        dispatch(myOrders());



        if (error) {
            alert.error(error);

            dispatch(clearErrors())
        }
    }, [dispatch, alert, error])

    return (
        <Fragment>
            {isAuthenticated ? (
                <Fragment>
                    <MetaData title={'My orders'} />

                    <h1 className="mt-5">My orders</h1>

                    {loading ? <Loader /> : (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Order ID</th>
                                    <th scope="col">No of Items</th>
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
                                        <td>{<Link to={`/orders/${order._id}`} className="btn btn-primary" >
                                            <i className="fa fa-eye"></i>
                                        </Link>}</td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>

                    )}
                </Fragment>
            ) : (
                navigate('/login')
            )}

        </Fragment>
    )
}

export default ListOrders
