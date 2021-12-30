import React, { Fragment } from 'react'

import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../layouts/Loader';
import MetaData from '../layouts/MetaData';

const Profile = () => {

    const { user, loading, isAuthenticated } = useSelector(state => state.auth)
    const navigate = useNavigate();

    return (
        <Fragment>
            {loading ? <Loader /> : isAuthenticated ? (
                <Fragment>
                    <MetaData title={'My profile'} />

                    <h2 className="mt-5 ml-5">My Profile</h2>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user.avatar && user.avatar.url} alt={user.name} />
                            </figure>
                            <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Edit Profile
                            </Link>
                        </div>

                        <div className="col-12 col-md-5">
                            <h4>Full Name</h4>
                            <p>{user.name}</p>

                            <h4>Email Address</h4>
                            <p>{user.email}</p>

                            <h4>Joined on</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>

                            {user.role !== 'admin' && (
                                <Link to="/orders/me" className="btn btn-danger btn-block mt-4 me-3">
                                My Orders
                            </Link>
                            )}

                            <Link to="/password/update" className="btn btn-primary btn-block mt-4 me-3">
                                Change Password
                            </Link>
                        </div>
                    </div>

                </Fragment>
            ) : (
                navigate('/login')
            )}
        </Fragment>
    )
}

export default Profile
