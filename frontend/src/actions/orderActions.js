import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    FILTER_ORDERS_REQUEST,
    FILTER_ORDERS_SUCCESS,
    FILTER_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS,
    WEEKDATA_REQUEST,
    WEEKDATA_FAIL,
    WEEKDATA_SUCCESS
} from '../constants/orderConstants';
import axios from 'axios'


export const createOrder = (order) => async (dispatch, getState) => {
    try {

        dispatch({
            type: CREATE_ORDER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/order/new`, order, config)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

/* -------------------------------------------------------------------------- */
/*                          get logged in user orders                         */
/* -------------------------------------------------------------------------- */

export const myOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: MY_ORDERS_REQUEST
        })

        const { data } = await axios.get('/api/v1/orders/me')

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

/* -------------------------------------------------------------------------- */
/*                           get user order details                           */
/* -------------------------------------------------------------------------- */
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        });

        const { data } = await axios.get(`/api/v1/order/${id}`)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

/* -------------------------------------------------------------------------- */
/*                           get all orders (admin)                           */
/* -------------------------------------------------------------------------- */
export const allOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_ORDERS_REQUEST
        });

        const { data } = await axios.get(`/api/v1/admin/orders`)

        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

/* -------------------------------------------------------------------------- */
/*                             filter orders (admin)                            */
/* -------------------------------------------------------------------------- */
export const filterOrders = (from, to) => async (dispatch) => {
    try {
        dispatch({
            type: FILTER_ORDERS_REQUEST
        });

        const { data } = await axios.get(`/api/v1/admin/orders/sort?from=${from}&to=${to}`)

        dispatch({
            type: FILTER_ORDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: FILTER_ORDERS_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}


/* -------------------------------------------------------------------------- */
/*                            update order (admin)                            */
/* -------------------------------------------------------------------------- */
export const updateOrder = (id, orderData) => async (dispatch) => {
    try {

        dispatch({
            type: UPDATE_ORDER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData, config)

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

/* -------------------------------------------------------------------------- */
/*                            delete order (admin)                            */
/* -------------------------------------------------------------------------- */
export const deleteOrder = (id) => async (dispatch) => {
    try {

        dispatch({
            type: DELETE_ORDER_REQUEST
        })

        const { data } = await axios.delete(`/api/v1/admin/order/${id}`)

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

export const weekData = () => async (dispatch) => {
    try {
        
        dispatch({
            type: WEEKDATA_REQUEST
        })

        const { data } = await axios.get(`/api/v1/admin/orders/lastweek`)

        dispatch({
            type: WEEKDATA_SUCCESS,
            payload: data.weekData
        })

    } catch (error) {
        dispatch({
            type: WEEKDATA_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}


//clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}