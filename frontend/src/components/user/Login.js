import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'

const Login = () => {

    const [email, setEamil] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    // const redirect = window.location.search ? window.location.search.split('=')[1] : '/'

    useEffect(() => {

        if (isAuthenticated) {
            // navigate(redirect)
            navigate('/')
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, isAuthenticated, error, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>

                    <MetaData title="Login" />

                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-3">Login</h1>
                                <div className="form-group mb-3">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEamil(e.target.value)}
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="password_field">Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <Link to="/password/forgot" className="float-end mb-4">Forgot Password?</Link>

                                <div className="d-grid gap-2 mx-auto">
                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    LOGIN
                                </button>
                                </div>
                                

                                <Link to="/register" className="float-end mt-3 mb-3">New User?</Link>
                            </form>
                        </div>
                    </div>


                </Fragment>
            )}
        </Fragment>
    )
}

export default Login
