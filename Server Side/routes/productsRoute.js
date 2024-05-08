const express = require('express');
const { productFileUpload } = require('../config/fileUpload');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { isAdmin } = require('../middlewares/isAdmin');
const { createProductController, getProductsController, getProductController, updateProductController, deleteProductController } = require('../controllers/productsController');

const router = express.Router();

router
    .post('/', isLoggedIn, isAdmin, productFileUpload.array('files'), createProductController)
    .get('/', getProductsController)
    .get('/:id', getProductController)
    .put('/:id', isLoggedIn, isAdmin, updateProductController)
    .delete('/:id', isLoggedIn, isAdmin, deleteProductController);

module.exports = router;
