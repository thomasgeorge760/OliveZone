import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from './CheckoutSteps';
import { useAlert } from 'react-alert'
// import PayPal from "./PayPal";
import { PayPalButton } from "react-paypal-button-v2";

import { createOrder, clearErrors } from '../../actions/orderActions';
import axios from 'axios';


function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        document.body.appendChild(script)

        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }

    })
}

const ConfirmOrder = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const { error } = useSelector(state => state.newOrder);

    const [paymentMethod, setPaymentMethod] = useState('')
    const [paymentId, setPaymentId] = useState(null);
    // const [orderId, setOrderId] = useState(null);
    // const [signature, setSignature] = useState(null);


    /* ------------------------- calculate order prices ------------------------- */
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
    const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

    /* ---------------------- calculate order price finish ---------------------- */

    // const orderInfo = {
    //     itemsPrice: itemsPrice.toFixed(2),
    //     shippingPrice,
    //     taxPrice,
    //     totalPrice
    // }


    // const paymentData = {
    //     amount: Math.round(totalPrice * 100)
    // }

    const order = {
        orderItems: cartItems,
        shippingInfo,
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice,
        taxPrice,
        totalPrice,
    }


    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }



    }, [dispatch, error, alert]);



    const proceedToPayment = () => {

        if (paymentMethod === 'Razorpay') {
            displayRazorpay();
        }


        // sessionStorage.setItem('orderInfo', JSON.stringify(orderInfo))

        // navigate('/payment')
    }

    const cashOnDelivery = () => {

        order.paymentInfo = {
            id: 'COD',
            status: 'COD'
        }

        dispatch(createOrder(order))

        navigate('/success')

    }

    const razorPaySuccess = () => {
        order.paymentInfo = {
            id: paymentId,
            status: 'success'
        }

        dispatch(createOrder(order))

        navigate('/success')
    }

    const paypalSuccessHandler = (details, data) => {
        order.paymentInfo = details.id

        dispatch(createOrder(order))

        navigate('/success')

    }

    async function displayRazorpay() {

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert.error('Razorpay sdk failed to load. Please try again.')
            return
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // const orderData = {
        //     amount: totalPrice
        // }
        try {
            var response = await axios.post('/api/v1/razorpay', order, config)

            console.log(response)
        } catch (error) {
            console.log(error.response.data.errorMessage)
        }


        // console.log(response)

        if (response) {

            var options = {
                "key": "rzp_test_toTgvsLqs5fQjG", // Enter the Key ID generated from the Dashboard
                "amount": response.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "OliveZone",
                "description": "Complete payment to place your order",
                "image": "/images/logo2.png",
                "order_id": response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": function (response) {
                    setPaymentId(response.razorpay_payment_id);
                    // setOrderId(response.razorpay_order_id);
                    // setSignature(response.razorpay_signature);
                    razorPaySuccess();
                    //alert.success(response.razorpay_payment_id);
                    // alert.success(response.razorpay_order_id);
                    // alert.success(response.razorpay_signature)
                },
                "prefill": {
                    "name": user.name,
                    "email": user.email,
                    "contact": shippingInfo.phoneNo
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#e0a85a"
                }
            };
            var paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } else {
            alert.error('Something went wrong, please try again')
        }
    }



    return (
        <Fragment>
            <MetaData title={'Confirm order'} />
            {isAuthenticated ? (
                <Fragment>

                    <CheckoutSteps shipping confirmOrder />

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8 mt-5 order-confirm">

                            <h4 className="mb-3">Shipping Info</h4>
                            <p><b>Name:</b>{user && user.name}</p>
                            <p><b>Phone:</b>{shippingInfo.phoneNo}</p>
                            <p className="mb-4"><b>Address:</b>{`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>

                            <hr />
                            <h4 className="mt-4">Your Cart Items:</h4>

                            {cartItems.map(item => (
                                <Fragment>
                                    <hr />
                                    <div className="cart-item my-1" key={item.product}>
                                        <div className="row">
                                            <div className="col-4 col-lg-2">
                                                <img src={item.image} alt={item.name} height="45" width="65" />
                                            </div>

                                            <div className="col-5 col-lg-6">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>


                                            <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                                <p>{item.quantity} x ₹ {item.price} = <b>₹ {item.quantity * item.price}</b></p>
                                            </div>

                                        </div>
                                    </div>
                                </Fragment>
                            ))}


                            <hr />

                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal:  <span className="order-summary-values">₹ {itemsPrice}</span></p>
                                <p>Shipping: <span className="order-summary-values">₹ {shippingPrice}</span></p>
                                <p>Tax:  <span className="order-summary-values">₹ {taxPrice}</span></p>

                                <hr />

                                <p>Total: <span className="order-summary-values">₹ {totalPrice}</span></p>

                                <hr />
                                <h4>Payment methods</h4>
                                <hr />

                                <form>
                                    <div className="form-group">
                                        <input type="radio" id="cash-on-delivery" name="payment-method" value="COD" onChange={(e) => setPaymentMethod(e.target.value)} />
                                        <label htmlFor="cash-on-delivery">&nbsp;&nbsp;COD</label>
                                    </div>

                                    <div className="form-group">
                                        <input type="radio" id="cash-on-delivery" name="payment-method" value="Razorpay" onChange={(e) => setPaymentMethod(e.target.value)} />
                                        <label htmlFor="cash-on-delivery">&nbsp;&nbsp;Razorpay</label>
                                    </div>

                                    <div className="form-group">
                                        <input type="radio" id="cash-on-delivery" name="payment-method" value="Paypal" onChange={(e) => setPaymentMethod(e.target.value)} />
                                        <label htmlFor="cash-on-delivery">&nbsp;&nbsp;Paypal</label>
                                    </div>

                                </form>
                                {paymentMethod && paymentMethod !== 'Paypal' &&
                                    <button id="checkout_btn" className="btn btn-primary btn-block" onClick={paymentMethod === 'COD' ? cashOnDelivery : proceedToPayment}>Proceed to {paymentMethod === 'COD' ? 'place order' : 'Razorpay'}</button>
                                }

                                {paymentMethod && paymentMethod === 'Paypal' &&
                                    <PayPalButton

                                        amount={totalPrice}
                                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                        onSuccess={(details, data) => {
                                            console.log(details);
                                            console.log(data);

                                            //need more work to be done

                                            paypalSuccessHandler(details, data);
                                            // return instance.post("/placeorder", datas).then((result) => {
                                            //     if (result) {
                                            //         swal({
                                            //             title: "Order placed successfully!",
                                            //             text: `Delivery expect on ${date}`,
                                            //             icon: "success",
                                            //             button: "Aww yiss!",
                                            //         });
                                            //     }
                                            //     navigate('/success')
                                            // });

                                            //
                                        }}
                                    />
                                }

                            </div>
                        </div>


                    </div>
                </Fragment>)
                : (
                    <Navigate to="/login" />
                )}

        </Fragment>
    )
}

export default ConfirmOrder
