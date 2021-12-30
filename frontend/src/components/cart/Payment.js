import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../layouts/MetaData';
// import { useAlert } from 'react-alert'
// import { useDispatch, useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
import CheckoutSteps from './CheckoutSteps';
// import { useStripe, useElements, cardNumberElement, cardExpiryElement, cardCvcElement } from '@stripe/react-stripe-js';
import { PaymentElement, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'


const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}

const Payment = () => {

    const navigate = useNavigate();
    // const alert = useAlert();
    // const stripe = useStripe();
    
    // const Elements = useElements();
    // const dispatch = useDispatch();

    // const { user, isAuthenticated } = useSelector(state => state.auth);
    const { isAuthenticated } = useSelector(state => state.auth);
    // const { cartItems, shippingInfo } = useSelector(state => state.cart)
    
    const [stripeApiKey, setStripeApiKey] = useState('')

    useEffect(() => {

        async function getStripeApiKey() {
            const { data } = await axios.get('/api/v1/stripe/api');
            setStripeApiKey(data.stripeApiKey)
          }
      
          getStripeApiKey();

    }, [])

    return (
        <Fragment>
            <MetaData title={'Payment'} />
            {isAuthenticated ? (
                <Elements stripe={loadStripe(stripeApiKey)}>
                
    
            
                <Fragment>

                    <CheckoutSteps shipping confirmOrder payment />

                    

                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg">
                                <h1 className="mb-4">Card Info</h1>
                                <div className="form-group">
                                    <PaymentElement />
                                    <label htmlFor="card_num_field">Card Number</label>
                                    <CardNumberElement
                                        type="text"
                                        id="card_num_field"
                                        className="form-control"
                                        options={options}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="card_exp_field">Card Expiry</label>
                                    <CardExpiryElement
                                        type="text"
                                        id="card_exp_field"
                                        className="form-control"
                                        options={options}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="card_cvc_field">Card CVC</label>
                                    <CardCvcElement
                                        type="text"
                                        id="card_cvc_field"
                                        className="form-control"
                                        options={options}
                                    />
                                </div>


                                <button
                                    id="pay_btn"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    Pay
                                </button>

                            </form>
                        </div>
                    </div>
                </Fragment>
                </Elements>
            ) : (
                navigate('/login')
            )}

        </Fragment>
    )
}

export default Payment
