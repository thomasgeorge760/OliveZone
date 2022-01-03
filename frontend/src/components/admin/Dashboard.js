import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

import Sidebar from './Sidebar'
import { getAdminProducts } from '../../actions/productActions';
import { allOrders } from '../../actions/orderActions';
import { allUsers } from '../../actions/userActions';
import Loader from '../layouts/Loader';
import MetaData from '../layouts/MetaData';

const Dashboard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isAuthenticated } = useSelector(state => state.auth);
    const { products } = useSelector(state => state.products);
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders);
    const { users } = useSelector(state => state.allUsers);

    let outOfStock = 0;

    products.forEach(product => {
        if (product.stock <= 0) {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(allOrders());
        dispatch(allUsers());
    }, [dispatch])

    return (
        <Fragment>

            {isAuthenticated && user.role === 'admin' ? (
                <div className="row">
                    <div className="col-12 col-md-3 col-lg-2">
                        <Sidebar />
                    </div>

                    <div className="col-12 col-md-9 col-lg-10">
                        <h1 className="my-4">Dashboard</h1>

                        {loading ? <Loader /> : (
                            <Fragment>
                                <MetaData title={'Admin Dashboard'} />

                                <div className="row pe-4">
                                    <div className="col-xl-12 col-sm-12 mb-3">
                                        <div className="card text-white bg-primary o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Total Amount<br /> <b>${totalAmount && totalAmount.toFixed(2)}</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row pe-4">
                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-warning o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Statistics<br /> <b>5% increase</b></div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/admin/statistics">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>


                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-success o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Products<br /> <b>{products && products.length}</b></div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>


                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-success o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Categories<br /> <b>10</b></div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/admin/categories">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>


                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-warning o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Orders<br /> <b>{orders && orders.length}</b></div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>


                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-info o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>


                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className={`card text-white ${outOfStock > 0 ? "bg-danger" : "bg-success"} o-hidden h-100`}>
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/admin/outOfStock">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                            </Fragment>
                        )}


                    </div>
                </div>
            ) : (
                navigate('/')
            )}




        </Fragment>
    )
}

export default Dashboard
