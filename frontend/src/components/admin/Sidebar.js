import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
                    </li>

                    <li>
                        <Link to="/admin/salesreport"><i className="fa fa-line-chart"></i> SalesReport</Link>
                    </li>

                    <li>
                        <Link to="#productSubmenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-product-hunt"></i> Products </Link>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                                <Link to="/admin/products"><i className="fa fa-list"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/admin/product"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="#categorySubmenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-sort-amount-asc"></i> Categories </Link>
                        <ul className="collapse list-unstyled" id="categorySubmenu">
                            <li>
                                <Link to="/admin/categories"><i className="fa fa-list"></i> All</Link>
                            </li>
{/* 
                            <li>
                                <Link to="/admin/category"><i className="fa fa-plus"></i> Create</Link>
                            </li> */}
                        </ul>
                    </li>

                    <li>
                        <Link to="/admin/orders"><i className="fa fa-shopping-bag"></i> Orders</Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                    </li>

                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
