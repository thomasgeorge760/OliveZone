import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer } from './reducers/productReducers';
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer, blockDataReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { myOrdersReducer, newOrderReducer, orderDetailsReducer, allOrdersReducer, orderReducer, weekDataReducer } from './reducers/orderReducers';
import { categoriesReducer, categoryDetailsReducer, newCategoryReducer } from './reducers/categoryReducers';

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    product: productReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    auth: authReducer,
    user: userReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    allOrders: allOrdersReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer,
    newReview: newReviewReducer,
    categories: categoriesReducer,
    newCategory: newCategoryReducer,
    categoryDetails: categoryDetailsReducer,
    blockData: blockDataReducer,
    weekData: weekDataReducer
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem(`cartItems`)
            ? JSON.parse(localStorage.getItem(`cartItems`))
            : [],
        shippingInfo: localStorage.getItem(`shippingInfo`)
            ? JSON.parse(localStorage.getItem(`shippingInfo`))
            : {}
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;