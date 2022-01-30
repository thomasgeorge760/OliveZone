import React, { Fragment, useEffect, useState } from 'react'

import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, getUserDetails, clearErrors } from '../../actions/userActions'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { UPDATE_USER_RESET } from "../../constants/userConstants";

function UpdateUser() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const { isAuthenticated, user: loggedInUser } = useSelector(state => state.auth);
    const { error, isUpdated } = useSelector(state => state.user);
    const { user } = useSelector(state => state.userDetails);

    const userId = params.id;

    useEffect(() => {


        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success('User updated successfully');

            navigate('/admin/users')

            dispatch({
                type: UPDATE_USER_RESET
            })
        }

    }, [dispatch, user, userId, alert, isUpdated, isAuthenticated, error, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);

        formData.set('role', role);

        dispatch(updateUser(user._id, formData))
    }

    return (
        <Fragment>

            {isAuthenticated && loggedInUser.role === 'admin' ? (
                <Fragment>

                    <MetaData title={`Update user`} />

                    <div className="row">
                        <div className="col-12 col-md-3 col-lg-2">
                            <Sidebar />
                        </div>

                        <div className="col-12 col-md-9 col-lg-10">
                            <div className="row wrapper">
                                <div className="col-10 col-lg-5">
                                    <form className="shadow-lg" onSubmit={submitHandler}>
                                        <h1 className="mt-2 mb-5">Update User</h1>

                                        <div className="form-group">
                                            <label for="name_field">Name</label>
                                            <input
                                                type="name"
                                                id="name_field"
                                                className="form-control"
                                                name='name'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label for="email_field">Email</label>
                                            <input
                                                type="email"
                                                id="email_field"
                                                className="form-control"
                                                name='email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label for="role_field">Role</label>

                                            <select
                                                id="role_field"
                                                className="form-control"
                                                name='role'
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                            >
                                                <option value="user">user</option>
                                                <option value="admin">admin</option>
                                            </select>
                                        </div>

                                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>



                </Fragment>
            ) : (
                <Navigate to="/" />
            )}

        </Fragment>
    )
}

export default UpdateUser
