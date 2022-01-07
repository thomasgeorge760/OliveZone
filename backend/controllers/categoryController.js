const Category = require('../models/category')
const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')


/* -------------------------------------------------------------------------- */
/*                         get all categories                          */
/* -------------------------------------------------------------------------- */
exports.getCategories = catchAsyncErrors(async (req, res, next) => {

    const categories = await Category.find();

    res.status(200).json({
        success: true,
        categories
    })
})

/* -------------------------------------------------------------------------- */
/*                         get single category (admin)                        */
/* -------------------------------------------------------------------------- */
exports.getSingleCategory = catchAsyncErrors(async (req, res, next) => {

    const category = await Category.findById(req.params.id);

    res.status(200).json({
        success: true,
        category
    })
})

/* -------------------------------------------------------------------------- */
/*                         create new category (admin)                        */
/* -------------------------------------------------------------------------- */

exports.newCategory = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const category = await Category.create(req.body);

    res.status(201).json({
        success: true,
        category
    })
})

/* -------------------------------------------------------------------------- */
/*                              update Categoty (admin)                       */
/* -------------------------------------------------------------------------- */
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    let category = await Category.findById(req.params.id);
    if (!category) {
        return next(new ErrorHandler('Category not found', 404))
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        category
    })
})

/* -------------------------------------------------------------------------- */
/*                           delete category (admin)                          */
/* -------------------------------------------------------------------------- */

exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {


    const category = await Category.findById(req.params.id);

    if (!category) {
        return next(new ErrorHandler('Category not found', 404))
    }


    await Category.deleteOne({ _id: req.params.id })

    res.status(200).json({
        success: true,
        message: 'Category deleted successfully'
    })

})

/* -------------------------------------------------------------------------- */
/*                       create new subCategory (admin)                       */
/* -------------------------------------------------------------------------- */
exports.newSubCategory = catchAsyncErrors(async (req, res, next) => {

    
    var category = await Category.findById(req.query.id);

    var error = 0

    category.subCategories.map(subCategory => {
        if(subCategory.name === req.query.sub.toUpperCase()) {
            error++;
            
        }
    })

    if(error > 0) {
        return next(new ErrorHandler('Subcategory already exists', 404));
    }

    
    const subCategory = {
        name: req.query.sub
    }

    category.subCategories.push(subCategory);

    const updatedCategory = await Category.findByIdAndUpdate(req.query.id, category, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: 'Subcategory added successfully.',
        updatedCategory
    })

})


/* -------------------------------------------------------------------------- */
/*                         update subCategory (admin)                         */
/* -------------------------------------------------------------------------- */
exports.updateSubCategory = catchAsyncErrors(async (req, res, next) => {

    var category = await Category.findById(req.body.id);

    var products = await Product.aggregate([{$match:{subCategory:req.body.sub}}])

    products.forEach(async product => {
        product.subCategoryOfferPrice = product.price - (product.price*req.body.offerPercentage/100)
        product.subCategoryOfferPercentage = req.body.offerPercentage;
        product.subCategoryOfferDetails = req.body.offerDetails;
        
        await Product.findByIdAndUpdate(product._id,product)
    })

    const subCategories = category.subCategories.map(subCategory => {
       
        if(subCategory._id.equals(req.body.subId)) {
            
            subCategory.name= req.body.sub;
            subCategory.offerPercentage = req.body.offerPercentage;
            subCategory.offerDetails = req.body.offerDetails;
        }
        return subCategory;
    })

    category.subCategories = subCategories;

    const updatedCategory = await Category.findByIdAndUpdate(req.body.id, category, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: 'Subcategory updated successfully.',
        category: updatedCategory
    })
})

/* -------------------------------------------------------------------------- */
/*                         delete subCategory (admin)                         */
/* -------------------------------------------------------------------------- */
exports.deleteSubCategory = catchAsyncErrors(async (req, res, next) => {
   
    var category = await Category.findById(req.query.id);
    

    const subCategories = category.subCategories.filter(subCategory => subCategory.name !== req.query.sub.toUpperCase());

    category = await Category.findByIdAndUpdate(req.query.id, {
        subCategories
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        category
    })
})