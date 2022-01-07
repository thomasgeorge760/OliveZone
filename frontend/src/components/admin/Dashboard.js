import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
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
import { Bar, Doughnut, Pie } from 'react-chartjs-2';

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

    products && products.forEach(product => {
        if (product.stock <= 0) {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(allOrders());
        dispatch(allUsers());
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
            },
            title: {
                display: true,
                text: 'Yearly sales',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augus', 'September', 'October', 'November', 'December'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [100, 200, 300, 400, 500, 600, 700],
                backgroundColor: 'rgba(255, 99, 132)',
            },
            {
                label: 'Dataset 2',
                data: [200, 300, 400, 500, 600, 700, 800],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },

            {
                label: 'Dataset 3',
                data: [300, 400, 500, 600, 700, 800, 900],
                backgroundColor: 'rgba(53, 12, 235, 0.5)',
            },
        ],
    };



    //doughnutData section
    const doughnutData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [
            {
                label: 'of Votes',
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
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
                                                <div className="text-center card-font-size">Total Amount<br /> <b>${totalAmount && totalAmount.toFixed(2)}</b>
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
                                            <Link className="card-footer text-white clearfix small z-1" to="/admin/outOfStock">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="row pe-4 mb-5">
                                    <Bar options={options} data={data} />
                                </div>

                                <div className="row pe-4">
                                    <h1 className="my-4">User statuses</h1>

                                    <div className="col-sm-6 mb-3">
                                        <Pie data={doughnutData} />
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
