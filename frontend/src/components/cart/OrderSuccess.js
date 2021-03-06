import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { CLEAR_CART } from '../../constants/cartConstants';

import MetaData from '../layouts/MetaData';

const OrderSuccess = () => {

    const dispatch = useDispatch();

    dispatch({
        type:CLEAR_CART
    })

    localStorage.removeItem(`cartItems`)
    
    const { isAuthenticated } = useSelector(state => state.auth)

    return (
        <Fragment>
            {isAuthenticated ? (
                <Fragment>
                <MetaData title={'Order Success'} />
                <div className="row justify-content-center">
                    <div className="col-6 mt-5 text-center">
                        <img className="my-5 img-fluid d-block mx-auto" src="/images/success_image.png" alt="Order Success" width="200" height="200" />
    
                        <h2>Your Order has been placed successfully.</h2>
    
                        <Link to="/orders/me">Go to Orders</Link>
                    </div>
    
                </div>
                </Fragment>
            ) : (
                <Navigate to="/login" />
            )}


        </Fragment >
    )
}

export default OrderSuccess
