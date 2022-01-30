import React, { Fragment, useEffect, useState } from 'react'

import MetaData from '../layouts/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, loadUser, clearErrors } from '../../actions/userActions'
import { Navigate, useNavigate } from 'react-router-dom'
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [addressUpdateId, setAddressUpdateId] = useState('');
    const [avatar, setAvatar] = useState('');

    //must add a default avatar before production stage
    const [avatarPreview, setAvatarPreview] = useState('/images/camera.jpg');

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, user } = useSelector(state => state.auth);
    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {


        if (isAuthenticated) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success('User updated successfully');
            dispatch(loadUser());

            navigate('/me')

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

    }, [dispatch, user, alert, isUpdated, isAuthenticated, error, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('address', address);
        formData.set('addressUpdateId', addressUpdateId);
        formData.set('avatar', avatar);

        dispatch(updateProfile(formData))
    }

    const onChange = (e) => {


        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0]);


    }


    return (
        <Fragment>
            <MetaData title={'Update Profile'} />

            {isAuthenticated ? (
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                            <h1 className="mt-2 mb-5">Update Profile</h1>

                            <div className="form-group">
                                <label htmlFor="email_field">Name</label>
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
                                <label htmlFor="email_field">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            {user.addresses.length > 0 &&
                                <div className="form-group">
                                    <label htmlFor="addresses">Saved Addresses</label>
                                    <div class="list-group"
                                        id="addresses">

                                        {user.addresses.map(address => {
                                            return (
                                                <button type="button"
                                                    class="list-group-item list-group-item-action"
                                                    aria-current="true"
                                                    onClick={() => {
                                                        setAddressUpdateId(address._id)
                                                        setAddress(address.address)
                                                    }}>
                                                    {address.address}
                                                </button>
                                            )
                                        })}
                                    </div>
                                    {/* <input
                                        type="text"
                                        id="address_field"
                                        className="form-control"
                                        name='address'
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    /> */}
                                </div>
                            }

                            <div className="form-group">
                                <label htmlFor="address_field">Address</label>
                                <input
                                    type="text"
                                    id="address_field"
                                    className="form-control"
                                    name='address'                                    
                                    placeholder={'add new address or click on saved address to edit'}
                                    value={address}
                                    onChange={(e) => {setAddress(e.target.value)}}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='avatar_upload'>Avatar</label>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <figure className='avatar mr-3 item-rtl'>
                                            <img
                                                src={avatarPreview}
                                                className='rounded-circle'
                                                alt='Avatar Preview'
                                            />
                                        </figure>
                                    </div>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='avatar'
                                            className='custom-file-input'
                                            id='customFile'
                                            accept='images/*'
                                            onChange={onChange}
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Avatar
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn update-btn btn-block mt-4 mb-3"
                                disabled={loading ? true : false} >Update</button>
                        </form>
                    </div>
                </div>
            ) : (
                <Navigate to="/login" />
            )}
        </Fragment>
    )
}

export default UpdateProfile
