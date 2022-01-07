import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product, col }) => {

    var netOfferPercentage = 0
    var netOfferPrice = 0

    if (product.offerPercentage <= product.subCategoryOfferPercentage) {

        if (product.subCategoryOfferPercentage !== 0) {
            netOfferPercentage = product.subCategoryOfferPercentage
            netOfferPrice = product.subCategoryOfferPrice
        }else {
            netOfferPercentage = product.offerPercentage
            netOfferPrice = product.offerPrice
        }
        
    } else {
        netOfferPercentage = product.offerPercentage
        netOfferPrice = product.offerPrice
    }

    return (
        <div key={product._id} className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={product.images[0].url}
                    alt={product.name}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                    </div>
                    {netOfferPercentage !== 0 ? (
                        <Fragment>
                            <p style={{ color: '#db3725' }}>{netOfferPercentage}% off. Grab the deal now !</p>
                            <h5 className="" style={{ textDecoration: 'line-through', color: '#9c9ea1' }}>₹ {product.price}</h5>
                            
                            <h4 className="card-text" style={{ color: '#3cb807', fontWeight: 'bold' }}>₹ {netOfferPrice}</h4>
                        </Fragment>
                    ) : (
                        <p className="card-text">₹ {product.price}</p>

                    )}
                    <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                </div>
            </div>
        </div>

    )
}

export default Product
