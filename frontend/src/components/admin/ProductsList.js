import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts, clearErrors, deleteProduct } from '../../actions/productActions';
import Sidebar from './Sidebar';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductsList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, products } = useSelector(state => state.products);
    const { user, isAuthenticated } = useSelector(state => state.auth);
    const { error: deleteError, isDeleted } = useSelector(state => state.product);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }


    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            alert.error(error);

            dispatch(clearErrors())
        }

        if(deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if(isDeleted) {
            alert.success('Product deleted successfully');
            navigate('/admin/products');
            dispatch({
                type: DELETE_PRODUCT_RESET
            })
        }


    }, [dispatch, alert, error, deleteError, isDeleted, navigate])

    return (
        <Fragment>

            {isAuthenticated && user.role === 'admin' ? (
                <Fragment>

                    <MetaData title={'All products'} />

                    <div className="row">
                        <div className="col-12 col-md-3 col-lg-2">
                            <Sidebar />
                        </div>

                        <div className="col-12 col-md-9 col-lg-10">
                            <h1 className="my-4">All Products</h1>

                            {loading ? <Loader /> : (
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Stock</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {products && products.map(product => {
                                            return (<tr key={product._id}>
                                                <th scope="row">{product._id}</th>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td>{product.stock}</td>
                                                <td>{
                                                    <Fragment>
                                                        <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2" >
                                                            <i className="fa fa-pencil"></i>
                                                        </Link>
                                                        <button className="btn btn-danger py-1 px-2 ms-2" onClick={() => deleteProductHandler(product._id)} >
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </Fragment>
                                                }</td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </table>

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

export default ProductsList
