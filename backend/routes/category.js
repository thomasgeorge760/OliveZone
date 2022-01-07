const express = require('express')
const router = express.Router()


const { 
    getCategories, newCategory, updateCategory, deleteCategory, deleteSubCategory, getSingleCategory, newSubCategory, updateSubCategory
} = require('../controllers/categoryController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')



router.route('/categories').get(getCategories)
router.route('/admin/category').post(isAuthenticatedUser, authorizeRoles('admin'),newCategory)
router.route('/admin/category/subcategory').post(isAuthenticatedUser, authorizeRoles('admin'),newSubCategory)
router.route('/admin/category/subcategory').put(isAuthenticatedUser, authorizeRoles('admin'),updateSubCategory)
router.route('/admin/category/subcategory').delete(isAuthenticatedUser, authorizeRoles('admin'),deleteSubCategory)
router.route('/admin/category/:id').get(isAuthenticatedUser, authorizeRoles('admin'),getSingleCategory)
router.route('/admin/category/:id').put(isAuthenticatedUser, authorizeRoles('admin'),updateCategory)
router.route('/admin/category/:id').delete(isAuthenticatedUser, authorizeRoles('admin'),deleteCategory)


module.exports = router;