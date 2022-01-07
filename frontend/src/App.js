import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import axios from 'axios'

import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';

import { loadUser } from './actions/userActions';
import store from './store';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';
import ListOrders from './components/order/ListOrders';
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import { useSelector } from 'react-redux';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';
import OrderDetails from './components/order/OrderDetails';
import CategoryList from './components/admin/CategoryList';
import UpdateCategory from './components/admin/UpdateCategory';
import SalesReport from './components/admin/SalesReport';

// Payment
// import { Elements } from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js'

// import ProtectedRoute from './components/route/ProtectedRoute'


function App() {

  // const [stripeApiKey, setStripeApiKey] = useState('')

  const { user, isAuthenticated, loading } = useSelector(state => state.auth)

  

  useEffect(() => {
    store.dispatch(loadUser());

    // async function getStripeApiKey() {
    //   const { data } = await axios.get('/api/v1/stripe/api');
    //   setStripeApiKey(data.stripeApiKey)
    // }

    // getStripeApiKey();
  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>


            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/me/update" element={<UpdateProfile />} />
            <Route path="/password/update" element={<UpdatePassword />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<NewPassword />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
            {/* {stripeApiKey && */}

            <Route path="/payment" element={<Payment />} />
            {/* } */}

            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/orders/me" element={<ListOrders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />



          </Routes>
        </div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductsList />} />
          <Route path="/admin/product" element={<NewProduct />} />
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
          <Route path="/admin/orders" element={<OrdersList />} />
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/user/:id" element={<UpdateUser />} />
          <Route path="/admin/reviews" element={<ProductReviews />} />
          <Route path="/admin/categories" element={<CategoryList />} />
          <Route path="/admin/category/:id" element={<UpdateCategory />} />
          <Route path="/admin/salesreport" element={<SalesReport />} />

        </Routes>
        
        {!loading && isAuthenticated && user.role === 'admin' ? null : <Footer /> }
      </div>
    </Router>
  );
}

export default App;
