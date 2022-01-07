import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import MetaData from '../layouts/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, getProductDetails, clearErrors } from '../../actions/productActions';
import Sidebar from './Sidebar';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import Loader from '../layouts/Loader';
import { getCategories } from '../../actions/categoryActions';

const UpdateProduct = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const { error, product } = useSelector(state => state.productDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.product);
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const { loading: categoryLoading, categories } = useSelector(state => state.categories);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    //offer section
    const [offerPercentage, setOfferPercentage] = useState(0);
    const [offerPrice, setOfferPrice] = useState(0);
    const [offerDetails, setOfferDetails] = useState('');

    const productId = params.id;

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

    var subCategories
    categories && category && categories.filter((c )=> {
        if(c.name === category) {
            subCategories = c.subCategories
            return null
        }else return null
    })


    useEffect(() => {

        dispatch(getCategories());

        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId))
        } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setSubCategory(product.subCategory);
            setStock(product.stock);
            setSeller(product.seller);
            setOldImages(product.images);
            setOfferPercentage(product.offerPercentage);
            setOfferDetails(product.offerDetails);
            setOfferPrice(product.offerPrice);
        }

        if (error) {
            alert.error(error);

            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            navigate('/admin/products');
            alert.success('product updated successfully');
            dispatch(getProductDetails(productId))

            dispatch({

                type: UPDATE_PRODUCT_RESET
            })
        }
    }, [dispatch, alert, error, isUpdated, navigate, updateError, product, productId])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('subCategory', subCategory);
        formData.set('stock', stock);
        formData.set('seller', seller);
        formData.set('offerPercentage', offerPercentage);
        formData.set('offerDetails', offerDetails);
        formData.set('offerPrice', offerPrice);

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(updateProduct(product._id, formData))

    }

    const onChange = (e) => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])
        setOldImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])

                }
            }

            reader.readAsDataURL(file);
        })




    }

    //calculating offer price

    const calculateOfferPrice = () => {
        setOfferPrice((product.price - (offerPercentage * product.price / 100)).toFixed(2));
    }


    return (
        <Fragment>

            {isAuthenticated && user.role === 'admin' ? (
                <Fragment>

                    <MetaData title={'Update products'} />

                    <div className="row">
                        <div className="col-12 col-md-3 col-lg-2">
                            <Sidebar />
                        </div>

                        <div className="col-12 col-md-9 col-lg-10">
                            {categoryLoading ? <Loader /> : (
                                <Fragment>
                                    <div className="wrapper my-5">
                                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                            <h1 className="mb-4">Update Product</h1>

                                            <div className="form-group">
                                                <label htmlFor="name_field">Name</label>
                                                <input
                                                    type="text"
                                                    id="name_field"
                                                    className="form-control"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="price_field">Price</label>
                                                <input
                                                    type="text"
                                                    id="price_field"
                                                    className="form-control"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="description_field">Description</label>
                                                <textarea
                                                    className="form-control"
                                                    id="description_field"
                                                    rows="8"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}>

                                                </textarea>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="category_field">Category</label>
                                                <select className="form-control"
                                                    id="category_field"
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}>
                                                    <option value='' >Select Category</option>
                                                    {categories && categories.map(category => (
                                                        <option key={category._id} value={category.name} >{category.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            
                                            {category &&
                                                <div className="form-group">
                                                    <label htmlFor="category_field">Sub Category</label>
                                                    <select className="form-control"
                                                        id="category_field"
                                                        value={subCategory}
                                                        onChange={(e) => setSubCategory(e.target.value)}>
                                                        <option value='' >Select sub Category</option>
                                                        {subCategories && subCategories.map(subCategory => (
                                                            <option key={subCategory._id} value={subCategory.name} >{subCategory.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            }
                                            
                                            <div className="form-group">
                                                <label htmlFor="stock_field">Stock</label>
                                                <input
                                                    type="number"
                                                    id="stock_field"
                                                    className="form-control"
                                                    value={stock}
                                                    onChange={(e) => setStock(e.target.value)}
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
                                                        calculateOfferPrice()
                                                    }}
                                                />
                                                {offerPrice && <p>effective product price : {offerPrice}</p>}
                                            </div>

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

                                            <div className="form-group">
                                                <label htmlFor="seller_field">Seller Name</label>
                                                <input
                                                    type="text"
                                                    id="seller_field"
                                                    className="form-control"
                                                    value={seller}
                                                    onChange={(e) => setSeller(e.target.value)}
                                                />
                                            </div>

                                            <div className='form-group'>
                                                <label>Images</label>

                                                <div className='custom-file'>
                                                    <input
                                                        type='file'
                                                        name='product_images'
                                                        className='custom-file-input'
                                                        id='customFile'
                                                        onChange={onChange}
                                                        multiple
                                                    />
                                                    <label className='custom-file-label' htmlFor='customFile'>
                                                        Choose Images
                                                    </label>
                                                </div>

                                                {oldImages && oldImages.map(img => (
                                                    <img className='mt-3 me-2' src={img.url} alt={img.url} key={img} width="55" height="52" />
                                                ))}

                                                {imagesPreview.map(img => (
                                                    <img src={img} key={img} alt="Images preview" className='mt-3 me-2' width="55" height="52" />
                                                ))}

                                            </div>


                                            <button
                                                id="login_button"
                                                type="submit"
                                                className="btn btn-block py-3"
                                                disabled={loading ? true : false}
                                            >
                                                UPDATE
                                            </button>

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

export default UpdateProduct
