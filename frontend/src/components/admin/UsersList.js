import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { allUsers, clearErrors, deleteUser } from '../../actions/userActions';
import Sidebar from './Sidebar';
import { DELETE_USER_RESET } from '../../constants/userConstants';


function UsersList() {

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, users } = useSelector(state => state.allUsers);
    const { user, isAuthenticated } = useSelector(state => state.auth);
    const { isDeleted } = useSelector(state => state.user);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }


    useEffect(() => {
        dispatch(allUsers());

        if (error) {
            alert.error(error);

            dispatch(clearErrors())
        }

        if(isDeleted) {
            alert.success('User deleted successfully');
            navigate('/admin/users');
            dispatch({
                type: DELETE_USER_RESET
            })
        }


    }, [dispatch, alert, error, isDeleted, navigate])

    return (
        <Fragment>

            {isAuthenticated && user.role === 'admin' ? (
                <Fragment>

                    <MetaData title={'All usres'} />

                    <div className="row">
                        <div className="col-12 col-md-3 col-lg-2">
                            <Sidebar />
                        </div>

                        <div className="col-12 col-md-9 col-lg-10">
                            <h1 className="my-4">All Users</h1>

                            {loading ? <Loader /> : (
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Image</th>
                                                <th scope="col">User ID</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Role</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {users && users.map(user => {
                                                return (<tr key={user._id}>
                                                    <th scope="row">{user.name}</th>
                                                    <td>
                                                        <img src={user.avatar.url} alt={user.name} width={50} height={52} ></img>
                                                    </td>
                                                    <td>{user._id}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.role}</td>
                                                    <td>{
                                                        <Fragment>
                                                            <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2" >
                                                                <i className="fa fa-pencil"></i>
                                                            </Link>
                                                            <button className="btn btn-danger py-1 px-2 ms-2" onClick={() => deleteUserHandler(user._id)}>
                                                                <i className="fa fa-trash"></i>
                                                            </button>
                                                           
                                                        </Fragment>
                                                    }</td>
                                                </tr>)
                                            })}
                                        </tbody>
                                    </table>
                                </div>

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

export default UsersList