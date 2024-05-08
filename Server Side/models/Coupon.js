const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

// Todo: Virtuals
// Coupon is Expired
CouponSchema.virtual("isExpired").get(function () {
    return this?.endDate < Date.now();
});
// Days to expired
CouponSchema.virtual("daysLeft").get(function () {
    const daysLeft = Math.floor((this.endDate - Date.now()) / (1000 * 60 * 60 * 24)) + " Days Left";
    return daysLeft;
});

// Todo: Validation
// Check accuracy of Timing 
CouponSchema.pre("validate", function (next) {
    if (this.endDate < this.startDate) next(new Error("End date cannot be less than the start date"));
    if (this.endDate < Date.now()) next(new Error("End date cannot be less than today"));
    // if (this.startDate < Date.now()) next(new Error("Start date cannot be less than today"));
    next();
});
// Check accuracy of Discount 
CouponSchema.pre("validate", function (next) {
    if (this.discount <= 0 || this.discount > 100) next(new Error("Discount cannot be less than 0 or greater than 100"));
    next();
});

module.exports = mongoose.model('Coupon', CouponSchema);