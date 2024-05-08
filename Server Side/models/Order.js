const mongoose = require('mongoose');

// Generate combination of random numbers and text for order
const randomText = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumber = Math.floor(1000 + Math.random() * 9000);

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderItems: [
            {
                type: Object,
                required: true,
            },
        ],
        shippingAddress: {
            type: Object,
            required: true,
        },
        orderNumber: {
            type: String,
            default: randomText + randomNumber,
        },

        // For Stripe Payment
        paymentStatus: {
            type: String,
            default: "Not paid",
        },
        paymentMethod: {
            type: String,
            default: "Not specified",
        },
        totalPrice: {
            type: Number,
            default: 0.0,
        },
        currency: {
            type: String,
            default: "Not specified",
        },

        // For Admin
        status: {
            type: String,
            default: "pending",
            enums: ["pending", "processing", "shipped", "delivered"]
        },
        deliveredAt: {
            type: Date,
        },
    }, { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);