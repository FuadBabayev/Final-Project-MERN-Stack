const express = require('express');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { isAdmin } = require('../middlewares/isAdmin');
const { createBrandController, getBrandsController, getBrandController, updateBrandController, deleteBrandController } = require('../controllers/brandsController');

const router = express.Router();

router
    .post('/', isLoggedIn, isAdmin, createBrandController)
    .get('/', getBrandsController)
    .get('/:id', getBrandController)
    .put('/:id', isLoggedIn, isAdmin, updateBrandController)
    .delete('/:id', isLoggedIn, isAdmin, deleteBrandController)

module.exports = router;