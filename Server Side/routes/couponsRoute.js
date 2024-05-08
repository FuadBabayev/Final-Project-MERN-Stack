const express = require('express');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { isAdmin } = require('../middlewares/isAdmin');
const { createCouponController, getCouponsController, getCouponController, updateCouponController, deleteCouponController } = require('../controllers/couponsController');

const router = express.Router();

router
    .post('/', isLoggedIn, isAdmin, createCouponController)
    .get('/', getCouponsController)
    .get('/single', getCouponController)
    .put('/:id', isLoggedIn, isAdmin, updateCouponController)
    .delete('/:id', isLoggedIn, isAdmin, deleteCouponController);

module.exports = router;