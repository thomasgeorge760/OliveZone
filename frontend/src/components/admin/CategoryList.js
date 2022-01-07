import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, deleteCategory, getCategories, newCategory } from '../../actions/categoryActions';
import { DELETE_CATEGORY_RESET, NEW_CATEGORY_RESET } from '../../constants/categoryConstants';
import Loader from '../layouts/Loader';
import MetaData from '../layouts/MetaData';
import Sidebar from './Sidebar';

function CategoryList() {


    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, categories } = useSelector(state => state.categories);
    const { user, isAuthenticated } = useSelector(state => state.auth);
    const { error: updateError, success, isDeleted } = useSelector(state => state.newCategory);

    const deleteCategoryHandler = (id) => {

        dispatch(deleteCategory(id))
    }

    const newCategoryHandler = (e) => {
        e.preventDefault();
        console.log(categoryName)

        const formData = new FormData();
        formData.set('name', categoryName);


        dispatch(newCategory(formData))
    }

    const [categoryName, setCategoryName] = useState('')


    useEffect(() => {
        dispatch(getCategories());

        if (error) {
            alert.error(error);

            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success('Category added successfully');

            setCategoryName('')

            dispatch({
                type: NEW_CATEGORY_RESET
            })

            dispatch(getCategories());
        }

        if (isDeleted) {
            alert.success('Category deleted successfully');

            dispatch({
                type: DELETE_CATEGORY_RESET
            })

            dispatch(getCategories())
        }


    }, [dispatch, alert, error, updateError, success, isDeleted])


    return (
        <Fragment>

            {isAuthenticated && user.role === 'admin' ? (
                <Fragment>

                    <MetaData title={'All categories'} />

                    <div className="row">
                        <div className="col-12 col-md-3 col-lg-2">
                            <Sidebar />
                        </div>

                        <div className="col-12 col-md-9 col-lg-10">
                            <Fragment>
                                <div className="wrapper my-5">
                                    <form className="shadow-lg" onSubmit={newCategoryHandler}>
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
                                            type="submit"
                                            className="btn btn-block py-3"
                                            disabled={loading ? true : false}
                                        >
                                            CREATE
                                        </button>
                                    </form>
                                </div>
                            </Fragment>
                            <h1 className="my-4">All Categories</h1>

                            {loading ? <Loader /> : (
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">ID</th>
                                            <th scope="col">Number of subCat</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {categories && categories.length > 0 && categories.map(category => {
                                            return (<tr key={category._id}>
                                                <th scope="row">{category.name}</th>
                                                <td>{category._id}</td>
                                                <td>{category.subCategories.length}</td>
                                                <td>{
                                                    <Fragment>
                                                        <Link to={`/admin/category/${category._id}`} className="btn btn-primary py-1 px-2" >
                                                            <i className="fa fa-pencil"></i>
                                                        </Link>
                                                        <button className="btn btn-danger py-1 px-2 ms-2" onClick={() => deleteCategoryHandler(category._id)} >
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

export default CategoryList
