const express = require('express');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { createOrderController, getOrdersController, getOrderController, updateOrderController, getSummaryController } = require('../controllers/ordersController');

const router = express.Router();

router
    .post('/', isLoggedIn, createOrderController)
    .get('/', isLoggedIn, getOrdersController)
    .get('/:id', isLoggedIn, getOrderController)
    .get('/sales/summary', isLoggedIn, getSummaryController)
    .put('/:id', isLoggedIn, updateOrderController)

module.exports = router;