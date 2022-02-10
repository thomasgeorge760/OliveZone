import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom'
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

import Sidebar from './Sidebar'
import { getAdminProducts } from '../../actions/productActions';
import { allOrders, weekData } from '../../actions/orderActions';
import { allUsers, blockData } from '../../actions/userActions';
import Loader from '../layouts/Loader';
import MetaData from '../layouts/MetaData';

const Dashboard = () => {

    const dispatch = useDispatch();

    const { user, isAuthenticated } = useSelector(state => state.auth);
    const { products } = useSelector(state => state.products);
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders);
    const { loading: blockDataLoading, blockedCount } = useSelector(state => state.blockData)
    const { loading: salesDataLoading, weekData: weekSalesCount } = useSelector(state => state.weekData)
    // const { users } = useSelector(state => state.allUsers);

    let outOfStock = 0;

    products && products.forEach(product => {
        if (product.stock <= 0) {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(allOrders());
        dispatch(allUsers());
        dispatch(blockData());
        dispatch(weekData())

        // if (allProductsError || allOrdersError || blockedDataError || weekDataError) {
        //     alert.error('Something wrong try again')
        // }

    }, [dispatch])

    //graph section starts



    ChartJS.register(
        ArcElement,
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        },
    };

    const labels = ['Sunday', 'Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Sales per day',
                data: weekSalesCount,
                backgroundColor: 'rgba(255, 99, 132)',
            }
        ],
    };



    //doughnutData section

    const doughnutData = {
        labels: ['Blocked', 'Unblocked'],
        datasets: [
            {
                label: 'of Votes',
                data: blockedCount,
                backgroundColor: [
                    'rgb(166, 25, 20)',

                    'rgb(35, 143, 19)'
                ],
                borderColor: [
                    'rgb(35, 143, 19)',
                    'rgb(166, 25, 20)'
                ],
                borderWidth: 1,
            },
        ],
    };


    //graph section ends

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

                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-primary o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Total Revenue<br /> <b>₹{totalAmount && totalAmount.toFixed(2)}</b>
                                                </div>
                                            </div>
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
                                        <div className={`card text-white ${outOfStock > 0 ? "bg-danger" : "bg-success"} o-hidden h-100`}>
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>

                                <div className="row pe-4">

                                    <div className="col-sm-8 mb-3">
                                        <h1 className="my-4">Last week sales</h1>
                                        {salesDataLoading ? <Loader /> :
                                            <Bar options={options} data={data} />
                                        }
                                    </div>

                                    <div className="col-sm-4 mb-3" style={{}}>
                                        <h1 className="my-4">User statuses</h1>
                                        {blockDataLoading ? <Loader /> :
                                            <Pie data={doughnutData} />
                                        }
                                    </div>

                                </div>

                            </Fragment>
                        )}


                    </div>
                </div>
            ) : (
                <Navigate to="/" />
            )}




        </Fragment>
    )
}

export default Dashboard
