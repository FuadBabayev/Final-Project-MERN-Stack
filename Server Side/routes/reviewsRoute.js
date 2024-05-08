const express = require('express');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { createReviewController } = require('../controllers/reviewsController');

const router = express.Router();

router
    .post('/:productID', isLoggedIn, createReviewController)

module.exports = router;