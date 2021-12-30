import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './layouts/MetaData'
import Pagination from 'react-js-pagination'
import Slider, { } from 'rc-slider'
import 'rc-slider/assets/index.css';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import Product from './product/Product';
import Loader from './layouts/Loader';

import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 1000]);
    const [category, setCategory] = useState('');
    const [ratings, setRatings] = useState(0);

    const params = useParams();

    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)

    const keyword = params.keyword
    // console.log(keyword)

    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/shoes',
        'Beauty/health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    useEffect(() => {

        if (error) {
            return alert.error(error);
        }

        dispatch(getProducts(keyword, currentPage, price, category, ratings));



    }, [dispatch, alert, error, keyword, currentPage, price, category, ratings])


    function setCurrentPageNo(pageNumber) {
        console.log(pageNumber)
        setCurrentPage(pageNumber);
    }

    let count = productsCount;
    if (keyword) {
        count = filteredProductsCount
    }

    return (
        <Fragment >

            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"Best products in the market"} />
                    <h1 id="products_heading">Latest Products</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">

                            {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        <div className="ps-5">
                                            <Range
                                                marks={{
                                                    1: `₹ 1`,
                                                    1000: `₹ 1000`
                                                }}
                                                min={1}
                                                max={1000}
                                                defaultValue={[1, 1000]}
                                                tipFormatter={value => `₹${value}`}
                                                tipProps={{
                                                    placement: 'top',
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />

                                            <hr className="my-5" />

                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Categories
                                                </h4>

                                                <ul className="ps-0">
                                                    {categories.map(category => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={category}
                                                            onClick={() => setCategory(category)}
                                                        >
                                                            {category}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <hr className="my-5" />

                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Ratings
                                                </h4>

                                                <ul className="ps-0">
                                                    {[5, 4, 3, 2, 1].map(star => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={star}
                                                            onClick={() => setRatings(star)}
                                                        >
                                                            <div className="rating-outer">
                                                                <div className="rating-inner"
                                                                    style={{
                                                                        width: `${star * 20}%`
                                                                    }}
                                                                >

                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            {products && products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                products && products.map(product => (
                                    <Product key={product._id} product={product} col={3} />
                                ))
                            )}



                        </div>
                    </section>

                    {resPerPage <= count && (
                        <div className="d-flex justify-content-cetnter mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemscount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}


                </Fragment>
            )}

        </Fragment>
    )
}

export default Home
