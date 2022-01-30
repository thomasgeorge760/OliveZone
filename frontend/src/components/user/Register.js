import React, { Fragment, useRef, useCallback, useEffect, useState } from 'react'

import MetaData from '../layouts/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// function generateDownload(canvas, crop) {
//     if (!crop || !canvas) {
//         return;
//     }

//     const data = canvas.toDataURL();


//     console.log(data.split('base64,')[1])

//     canvas.toBlob(
//         (blob) => {
//             const previewUrl = window.URL.createObjectURL(blob);
            
//             const anchor = document.createElement('a');
//             anchor.download = 'cropPreview.png';
//             anchor.href = URL.createObjectURL(blob);
//             anchor.click();

//             window.URL.revokeObjectURL(previewUrl);
//         },
//         'image/png',
//         1
//     );
// }

const Register = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState('https://res.cloudinary.com/deb6scajo/image/upload/v1640784817/avatars/sample_dp_luhfir.png');

//  const [avatarPreview, setAvatarPreview] = useState('https://res.cloudinary.com/deb6scajo/image/upload/v1640784817/avatars/sample_dp_luhfir.png');

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    //testing image crop

    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 / 1 });
    const [completedCrop, setCompletedCrop] = useState(null);
    const [confirm, setConfirm] = useState(false);

    //testing crop constants end



    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);

        dispatch(register(formData))
    }

    const onChange = (e) => {


        if (e.target.name === 'avatar') {


            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    // setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            // console.log(reader.readAsDataURL(e.target.files[0]))

            reader.readAsDataURL(e.target.files[0]);

        } else {

            setUser({
                ...user,
                [e.target.name]: e.target.value
            })


        }
    }

    //image crop test start
    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);



    useEffect(() => {

        if (isAuthenticated) {
            navigate('/')
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        //testing crop start
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );

        //testing crop end

    }, [dispatch, alert, isAuthenticated, error, navigate, completedCrop])


    return (
        <Fragment>

            <MetaData title={'Register user'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group mb-3">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        {/* testing crop start */}
                        <Fragment>
                            <div>
                                <input type="file" accept="image/*" name="avatar" onChange={(e)=> {onSelectFile(e)}} />
                            </div>
                            <ReactCrop
                                src={upImg}
                                onImageLoaded={onLoad}
                                crop={crop}
                                onChange={(c) => setCrop(c)}
                                onComplete={(c) => setCompletedCrop(c)}
                            />
                            <div>
                                <canvas
                                    ref={previewCanvasRef}
                                    // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                                    style={{
                                        width: Math.round(completedCrop?.width ?? 0),
                                        height: Math.round(completedCrop?.height ?? 0)
                                    }}
                                />
                            </div>
                           
                            <button
                                type="button"
                                className={`btn btn-block me-3 py-3 ${confirm ? 'bg-success' : 'bg-warning'}`}
                                disabled={!completedCrop?.width || !completedCrop?.height}
                                onClick={() =>
                                    {
                                        
                                        setAvatar(previewCanvasRef.current.toDataURL())
                                        setConfirm(true)
                                        // generateDownload(previewCanvasRef.current, completedCrop)
                                    }
                                }
                            >
                                Confirm crop
                            </button>
                        </Fragment>
                        {/* testing crop end */}

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={confirm && !loading ? false : true}
                        >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>


        </Fragment>
    )
}

export default Register
