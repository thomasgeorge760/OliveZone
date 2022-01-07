import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { allOrders, clearErrors } from '../../actions/orderActions';
import Sidebar from './Sidebar';

const SalesReport = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { user, isAuthenticated } = useSelector(state => state.auth);

    const [startDate, setStartDate] = useState(null)

    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            alert.error(error);

            dispatch(clearErrors())
        }



    }, [dispatch, alert, error])

    const filterHandler = () => {
        console.log(startDate)
    }

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
                            <h1 className="my-4">Sales Report</h1>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                                    <button className="btn btn-primary py-1 px-3 mx-3" onClick={filterHandler}>Filter</button>
                                </div>
                            </div>

                            {loading ? <Loader /> : (
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Order ID</th>
                                            <th scope="col">User Name</th>
                                            <th scope="col">User Email</th>
                                            <th scope="col">Number of Items</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {orders && orders.map(order => {
                                            return (<tr key={order._id}>
                                                <th scope="row">{order._id}</th>
                                                <td>{order.user.name}</td>
                                                <td>{order.user.email}</td>
                                                <td>{order.orderItems.length}</td>
                                                <td>{order.totalPrice}</td>
                                                <td>{order.orderStatus && String(order.orderStatus).includes('Delivered')
                                                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                                                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>}</td>

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

export default SalesReport
