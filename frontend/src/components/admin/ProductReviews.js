import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import MetaData from '../layouts/MetaData';
import Sidebar from './Sidebar';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getProductReviews, clearErrors, deleteReviews } from '../../actions/productActions';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';

function ProductReviews() {

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, reviews } = useSelector(state => state.productReviews);
    const { user, isAuthenticated } = useSelector(state => state.auth);
    const { isDeleted } = useSelector(state => state.review);

    const [productId, setProductId] = useState('')

    const deleteReviewHandler = (id) => {
        dispatch(deleteReviews(id, productId));
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductReviews(productId))
    }


    useEffect(() => {

        if (error) {
            alert.error(error);

            dispatch(clearErrors())
        }

        if(isDeleted) {
            alert.success('Review deleted successfully');
            dispatch({
                type: DELETE_REVIEW_RESET
            })
            dispatch(getProductReviews(productId));
        }


    }, [dispatch, alert, error, productId, isDeleted, navigate])


    return (
        <Fragment>

            {isAuthenticated && user.role === 'admin' ? (
                <Fragment>

                    <MetaData title={'Product reviews'} />

                    <div className="row">
                        <div className="col-12 col-md-3 col-lg-2">
                            <Sidebar />
                        </div>

                        <div className="col-12 col-md-9 col-lg-10">
                            <h1 className="my-4">Product reviews</h1>

                            <div className="row justify-content-center mt-5">
                                <div className="col-5">
                                    <form onSubmit={submitHandler}>
                                        <div className="form-group">
                                            <label htmlFor="productId_field">Enter Product ID</label>
                                            <input
                                                type="text"
                                                id="productId_field"
                                                className="form-control"
                                                value={productId}
                                                onChange={(e) => setProductId(e.target.value)}
                                            />
                                        </div>

                                        <button
                                            id="search_button"
                                            type="submit"
                                            className="btn btn-primary btn-block py-2"
                                            disabled={productId ? false : true}
                                        >
                                            SEARCH
                                        </button>
                                    </ form>
                                </div>

                            </div>

                            {reviews && reviews.length > 0 ? (

                                <div className="table-responsive">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Review ID</th>
                                                <th scope="col">Rating</th>
                                                <th scope="col">Comment</th>
                                                <th scope="col">User</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {reviews && reviews.map(review => {
                                                return (<tr key={review._id}>
                                                    <th scope="row">{review._id}</th>
                                                    <td>{review.rating}</td>
                                                    <td>{review.comment}</td>
                                                    <td>{review.name}</td>
                                                    <td>{review.role}</td>
                                                    <td>
                                                        <button className="btn btn-danger py-1 px-2 ms-2" onClick={() => deleteReviewHandler(review._id)}>
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>)
                                            })}
                                        </tbody>
                                    </table>
                                </div>


                            ) : (
                                <p className="mt-5 text-center">No reviews yet</p>
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

export default ProductReviews
