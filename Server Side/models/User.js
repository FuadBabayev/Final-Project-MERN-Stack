const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
            },
        ],
        wishLists: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "WhisList",
            },
        ],
        isAdmin: {
            type: Boolean,
            default: false,
        },
        hasShippingAddress: {
            type: Boolean,
            default: false,
        },
        shippingAddress: {
            firstName: String,
            lastName: String,
            address: String,
            city: String,
            postalCode: String,
            province: String,
            country: String,
            phone: String,
        },
    }, { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
