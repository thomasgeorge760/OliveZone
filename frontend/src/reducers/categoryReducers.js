import {
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,
    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_RESET,
    NEW_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_RESET,
    UPDATE_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_RESET,
    DELETE_CATEGORY_FAIL,
    NEW_SUBCATEGORY_REQUEST,
    NEW_SUBCATEGORY_SUCCESS,
    NEW_SUBCATEGORY_RESET,
    NEW_SUBCATEGORY_FAIL,
    UPDATE_SUBCATEGORY_REQUEST,
    UPDATE_SUBCATEGORY_SUCCESS,
    UPDATE_SUBCATEGORY_RESET,
    UPDATE_SUBCATEGORY_FAIL,
    DELETE_SUBCATEGORY_REQUEST,
    DELETE_SUBCATEGORY_SUCCESS,
    DELETE_SUBCATEGORY_RESET,
    DELETE_SUBCATEGORY_FAIL,
    CLEAR_ERRORS
} from '../constants/categoryConstants'


export const categoriesReducer = (state = { categories: [] }, action) => {
    switch (action.type) {

        case GET_CATEGORIES_REQUEST:
            return {
                loading: true,
                categories: []
            }
        case GET_CATEGORIES_SUCCESS:
            return {
                loading: false,
                categories: action.payload
            }
        case GET_CATEGORIES_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }


        default:
            return state;

    }
}


export const categoryDetailsReducer = (state = { category: {} }, action) => {
    switch (action.type) {

        case GET_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_CATEGORY_SUCCESS:
            return {

                loading: false,
                category: action.payload
            }
        case GET_CATEGORY_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newCategoryReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_CATEGORY_REQUEST:
        case UPDATE_CATEGORY_REQUEST:
        case DELETE_CATEGORY_REQUEST:
        case NEW_SUBCATEGORY_REQUEST:
        case UPDATE_SUBCATEGORY_REQUEST:
        case DELETE_SUBCATEGORY_REQUEST:

            return {
                ...state,
                loading: true
            }
        case NEW_CATEGORY_SUCCESS:
        case UPDATE_CATEGORY_SUCCESS:
        case NEW_SUBCATEGORY_SUCCESS:
        case UPDATE_SUBCATEGORY_SUCCESS:

            return {

                loading: false,
                success: action.payload.success,
                category: action.payload.category
            }
        case DELETE_CATEGORY_SUCCESS:
        case DELETE_SUBCATEGORY_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload.success
            }
        case NEW_CATEGORY_FAIL:
        case UPDATE_CATEGORY_FAIL:
        case DELETE_CATEGORY_FAIL:
        case NEW_SUBCATEGORY_FAIL:
        case UPDATE_SUBCATEGORY_FAIL:
        case DELETE_SUBCATEGORY_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case NEW_CATEGORY_RESET:
        case UPDATE_CATEGORY_RESET:
        case NEW_SUBCATEGORY_RESET:
        case UPDATE_SUBCATEGORY_RESET:

            return {
                ...state,
                success: false
            }
        case DELETE_CATEGORY_RESET:
        case DELETE_SUBCATEGORY_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

