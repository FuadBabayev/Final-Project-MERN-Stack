const express = require('express');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { isAdmin } = require('../middlewares/isAdmin');
const { createColorController, getColorsController, getColorController, updateColorController, deleteColorController } = require('../controllers/colorsController');

const router = express.Router();

router
    .post('/', isLoggedIn, isAdmin, createColorController)
    .get('/', getColorsController)
    .get('/:id', getColorController)
    .put('/:id', isLoggedIn, isAdmin, updateColorController)
    .delete('/:id', isLoggedIn, isAdmin, deleteColorController);

module.exports = router;