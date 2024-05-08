const express = require('express');
const { categoryFileUpload } = require('../config/categoryUpload');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { createCategoryController, getCategoriesController, getCategoryController, updateCategoryController, deleteCategoryController } = require('../controllers/categoriesController');

const router = express.Router();

router
    .post('/', isLoggedIn, categoryFileUpload.single("file"), createCategoryController)
    .get('/', getCategoriesController)
    .get('/:id', getCategoryController)
    .put('/:id', isLoggedIn, updateCategoryController)
    .delete('/:id', isLoggedIn, deleteCategoryController)

module.exports = router;