const bcrypt = require('bcryptjs');
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const generateToken = require('../utils/generateToken');
const { getTokenFromHeader } = require('../utils/getTokenFromHeader');
const { verifyToken } = require('../utils/verifyToken');
const { isLoggedIn } = require('../middlewares/isLoggedIn');


// Todo: Register User                 POST /api/v1/users/register                    Private/Admin
exports.registerUserController = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check User Exists
        const userExists = await User.findOne({ email });
        if (userExists) throw new Error('User already exists');

        // Hash password with Bcryptjs
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create User
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            status: "success",
            message: "User Registered Succesfully",
            data: user,
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error?.message
        });
    }
};


// Todo: Login User                    POST /api/v1/users/login                       Public
exports.loginUserController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Find the User in database by Email only
    const userFound = await User.findOne({ email });

    if (userFound && (await bcrypt.compare(password, userFound?.password))) {
        res.json({
            status: "success",
            message: "User logged in succesfully",
            // userFound,
            userFound: {
                username: userFound?.username,
                isAdmin: userFound?.isAdmin,
            },
            token: generateToken(userFound?._id),
        });
    } else {
        throw new Error("Invalid login credentials");
    }
});


// Todo: Get User Profile               GET /api/v1/users/profile                     Private
exports.getUsersProfileController = async (req, res) => {
    try {
        const user = await User.findById(req.userAuthId).populate("orders");
        res.status(200).json({
            status: "success",
            message: "User profile fetched succesfully",
            user,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "User not Found!"
        });
    }
};


// Todo: Update User Shipping Address   PUT /api/v1/users/update           Private
exports.updateShippingAddressController = async (req, res) => {
    const { firstName, lastName, address, city, postalCode, province, country, phone } = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.userAuthId, {
            hasShippingAddress: true,
            shippingAddress: {
                firstName,
                lastName,
                address,
                city,
                postalCode,
                province,
                country,
                phone
            }
        }, { new: true });

        res.status(200).json({
            status: "succes",
            message: "User Shipping Address Updated succesfully",
            user,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error?.message
        });
    }
};