import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import MetaData from '../layouts/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, newSubCategory, updateCategory, updateSubCategory, deleteSubCategory } from '../../actions/categoryActions';
import Sidebar from './Sidebar';
import { UPDATE_CATEGORY_RESET, NEW_SUBCATEGORY_RESET, DELETE_SUBCATEGORY_RESET } from '../../constants/categoryConstants';
import { getCategory } from '../../actions/categoryActions';
import Loader from '../layouts/Loader';

const UpdateCategory = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const { success, isDeleted, error: createError } = useSelector(state => state.newCategory);
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const { category, loading, error } = useSelector(state => state.categoryDetails);

    const [categoryName, setCategoryName] = useState('');
    // const [subCategories, setSubCategories] = useState([]);
    const [subCategoryChange, setSubCategoryChange] = useState('');
    const [subCategoryChangeId, setSubCategoryChangeId] = useState(null);
    const [newSubCategoryName, setNewSubCategoryName] = useState('');


    const [offerPercentage, setOfferPercentage] = useState(0);
    const [offerDetails, setOfferDetails] = useState('');
    // const [category, setCategory] = useState('');

    // const categories = [
    //     'Electronics',
    //     'Cameras',
    //     'Laptops',
    //     'Accessories',
    //     'Headphones',
    //     'Food',
    //     'Books',
    //     'Clothes/shoes',
    //     'Beauty/health',
    //     'Sports',
    //     'Outdoor',
    //     'Home'
    // ]

    const categoryId = params.id;

    useEffect(() => {

        if (category && category._id !== categoryId) {
            dispatch(getCategory(categoryId))
        } else {
            setCategoryName(category.name);
            // setSubCategories(category.subCategories);
        }

        if (error) {
            alert.error(error);

            dispatch(clearErrors())
        }

        if (createError) {
            alert.error(createError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('SubCategory deleted successfully')
            dispatch({
                type: DELETE_SUBCATEGORY_RESET
            })

            dispatch(getCategory(categoryId))
            setSubCategoryChange('')
            setSubCategoryChangeId('')
        }

        if (success) {

            alert.success('Category updated successfully');
            setSubCategoryChange('')
            setSubCategoryChangeId('')
            setOfferDetails('')
            setOfferPercentage(0)
            dispatch({
                type: UPDATE_CATEGORY_RESET
            })
            dispatch({
                type: NEW_SUBCATEGORY_RESET
            })
            dispatch(getCategory(categoryId))
        }
    }, [dispatch, alert, error, createError, success, navigate, category, categoryId, isDeleted])

    /* ------------------------- update categoryhandler ------------------------- */

    const submitHandler = (e) => {
        e.preventDefault();


        dispatch(updateCategory(categoryId, categoryName))
    }

    /* ------------------------- new subCategory handler ------------------------ */

    const newSubCategoryHandler = (e) => {

        e.preventDefault();

        dispatch(newSubCategory(categoryId, newSubCategoryName))

    }

    /* ------------------------ update SubCategoryHandler ----------------------- */

    const updateSubCategoryHandler = (e) => {
        e.preventDefault();
        const data = {
            id: categoryId,
            subId: subCategoryChangeId,
            sub: subCategoryChange,
            offerPercentage,
            offerDetails
        }
        dispatch(updateSubCategory(data))
    }

    /* ----------------------- delete subCategory handler ----------------------- */

    const deleteSubCategoryHandler = (e) => {
        e.preventDefault();
        dispatch(deleteSubCategory(categoryId, subCategoryChange))
    }


    return (
        <Fragment>

            {isAuthenticated && user.role === 'admin' ? (
                <Fragment>

                    <MetaData title={'Update category'} />

                    <div className="row">
                        <div className="col-12 col-md-3 col-lg-2">
                            <Sidebar />
                        </div>


                        <div className="col-12 col-md-5 col-lg-5">
                            <Fragment>
                                <div className="wrapper my-5">
                                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                        <h1 className="mb-4">Update category</h1>

                                        <div className="form-group">
                                            <label htmlFor="name_field">Category Name</label>
                                            <input
                                                type="text"
                                                id="name_field"
                                                className="form-control"
                                                value={categoryName}
                                                onChange={(e) => setCategoryName(e.target.value)}
                                            />
                                        </div>



                                        <button
                                            id="login_button"
                                            // type="submit"
                                            className="btn btn-block py-3"

                                            disabled={loading ? true : false}
                                        >
                                            Update
                                        </button>

                                    </form>
                                </div>

                            </Fragment>

                        </div>
                        <div className="col-12 col-md-4 col-lg-5">


                            {loading ? <Loader /> : (


                                <Fragment>

                                    <div className="wrapper my-5">
                                        <form className="shadow-lg" encType='multipart/form-data'>
                                            <h1 className="mb-4">create Sub Category</h1>

                                            <div className="form-group">
                                                <label htmlFor="name_field">New Sub Category Name</label>
                                                <input
                                                    type="text"
                                                    id="name_field"
                                                    className="form-control"
                                                    value={newSubCategoryName}
                                                    onChange={(e) => setNewSubCategoryName(e.target.value)}
                                                />
                                            </div>




                                            <button
                                                id="login_button"
                                                // type="submit"
                                                className="btn btn-block py-3"
                                                disabled={loading ? true : false}
                                                onClick={newSubCategoryHandler}
                                            >
                                                Add new subCategory
                                            </button>

                                            <hr />

                                            <h1 className="mb-4">Edit Sub Category</h1>


                                            <div className="form-group">
                                                <label htmlFor="Sub_category_field">select Sub Category</label>
                                                <div className="list-group">

                                                    {category.subCategories && category.subCategories.map(subCategory => (
                                                        <button type="button" className="list-group-item list-group-item-action" onClick={() => {
                                                            setSubCategoryChangeId(subCategory._id)
                                                            setSubCategoryChange(subCategory.name)
                                                            setOfferPercentage(subCategory.offerPercentage)
                                                            setOfferDetails(subCategory.offerDetails)
                                                        }}>
                                                            {subCategory.name} &nbsp;&nbsp;{subCategory.offerPercentage !== 0 && <i className="fa fa-star"></i>}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>


                                            {subCategoryChangeId && <Fragment>
                                                <div className="form-group">
                                                    <label htmlFor="name_field">Set new Category Name</label>
                                                    <input
                                                        type="text"
                                                        id="name_field"
                                                        className="form-control"
                                                        value={subCategoryChange}
                                                        onChange={(e) => setSubCategoryChange(e.target.value)}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="stock_field">Offer Percentage</label>
                                                    <input
                                                        type="number"
                                                        id="stock_field"
                                                        className="form-control"
                                                        value={offerPercentage}
                                                        onChange={(e) => {
                                                            setOfferPercentage(e.target.value)
                                                        }}
                                                    />

                                                </div>
                                                {offerPercentage !== 0 &&
                                                    <div className="form-group">
                                                        <label htmlFor="seller_field">Offer Details</label>
                                                        <input
                                                            type="text"
                                                            id="seller_field"
                                                            className="form-control"
                                                            value={offerDetails}
                                                            onChange={(e) => setOfferDetails(e.target.value)}
                                                        />
                                                    </div>
                                                }

                                                <button
                                                    id="login_button"
                                                    // type="submit"
                                                    onClick={updateSubCategoryHandler}
                                                    className="btn btn-block py-3 ms-3"
                                                    disabled={loading ? true : false}
                                                >
                                                    Update
                                                </button>

                                                <button
                                                    id="login_button"
                                                    // type="submit"
                                                    onClick={deleteSubCategoryHandler}
                                                    className="btn bg-danger btn-block ms-3 py-3"
                                                    disabled={loading ? true : false}
                                                >
                                                    delete
                                                </button>
                                            </Fragment>}
                                        </form>



                                    </div>

                                </Fragment>

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

export default UpdateCategory


