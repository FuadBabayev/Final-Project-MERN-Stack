const express = require('express');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { registerUserController, loginUserController, getUsersProfileController, updateShippingAddressController } = require('../controllers/usersController');

const router = express.Router();

router
    .post('/register', registerUserController)
    .post('/login', loginUserController)
    .get('/profile', isLoggedIn, getUsersProfileController)
    .put('/update/shipping', isLoggedIn, updateShippingAddressController);

module.exports = router;
