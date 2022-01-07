import axios from 'axios'
import {
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,
    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    NEW_SUBCATEGORY_REQUEST,
    NEW_SUBCATEGORY_SUCCESS,
    NEW_SUBCATEGORY_FAIL,
    UPDATE_SUBCATEGORY_REQUEST,
    UPDATE_SUBCATEGORY_SUCCESS,
    UPDATE_SUBCATEGORY_FAIL,
    DELETE_SUBCATEGORY_REQUEST,
    DELETE_SUBCATEGORY_SUCCESS,
    DELETE_SUBCATEGORY_FAIL,
    
    CLEAR_ERRORS,
} from '../constants/categoryConstants'


export const getCategories = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_CATEGORIES_REQUEST
        })

        const { data } = await axios.get(`/api/v1/categories`);

        dispatch({
            type: GET_CATEGORIES_SUCCESS,
            payload: data.categories
        })

    }catch(error) {
       
        dispatch({
            type: GET_CATEGORIES_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

export const getCategory = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_CATEGORY_REQUEST
        })

        const { data } = await axios.get(`/api/v1/admin/category/${id}`);

        dispatch({
            type: GET_CATEGORY_SUCCESS,
            payload: data.category
        })

    }catch(error) {
       
        dispatch({
            type: GET_CATEGORY_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

export const newCategory = (categoryData) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_CATEGORY_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/category`, categoryData, config);

        dispatch({
            type: NEW_CATEGORY_SUCCESS,
            payload: data
        })

    }catch(error) {
       
        dispatch({
            type: NEW_CATEGORY_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

export const updateCategory = (id, name) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_CATEGORY_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const categoryData = {
            name: name
        }

        const { data } = await axios.put(`/api/v1/admin/category/${id}`, categoryData, config);

        dispatch({
            type: UPDATE_CATEGORY_SUCCESS,
            payload: data
        })

    }catch(error) {
       
        dispatch({
            type: UPDATE_CATEGORY_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_CATEGORY_REQUEST
        })

        const { data } = await axios.delete(`/api/v1/admin/category/${id}`);

        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            payload: data
        })

    }catch(error) {
       
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

export const newSubCategory = (id,sub) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_SUBCATEGORY_REQUEST
        })

        const { data } = await axios.post(`/api/v1/admin/category/subcategory?id=${id}&sub=${sub}`);

        dispatch({
            type: NEW_SUBCATEGORY_SUCCESS,
            payload: data
        })

    }catch(error) {
       
        dispatch({
            type: NEW_SUBCATEGORY_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

export const updateSubCategory = (categoryData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_SUBCATEGORY_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }


        const { data } = await axios.put(`/api/v1/admin/category/subcategory`, categoryData, config);

        dispatch({
            type: UPDATE_SUBCATEGORY_SUCCESS,
            payload: data
        })

    }catch(error) {
       
        dispatch({
            type: UPDATE_SUBCATEGORY_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}


export const deleteSubCategory = (id,sub) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_SUBCATEGORY_REQUEST
        })

        const { data } = await axios.delete(`/api/v1/admin/category/subcategory?id=${id}&sub=${sub}`);

        dispatch({
            type: DELETE_SUBCATEGORY_SUCCESS,
            payload: data
        })

    }catch(error) {
       
        dispatch({
            type: DELETE_SUBCATEGORY_FAIL,
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