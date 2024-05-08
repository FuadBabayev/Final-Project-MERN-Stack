const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            ref: "Category",
            required: true,
        },
        sizes: {
            type: [String],
            enum: ["XS", "S", "M", "L", "XL", "XXL"],
            required: true,
        },
        colors: {
            type: [String],
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        images: [
            {
                type: String,
                required: true,
            },
        ],
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review",
            },
        ],
        price: {
            type: Number,
            required: true,
        },
        totalQty: {
            type: Number,
            required: true,
        },
        totalSold: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

// Todo: Virtuals
// Quantity Left
ProductSchema.virtual("qtyLeft").get(function () {
    return this?.totalQty - this?.totalSold;
});
// Total Reviews
ProductSchema.virtual("totalReviews").get(function () {
    return this?.reviews?.length;
});
// Average Rating
ProductSchema.virtual("averageRate").get(function () {
    const averageRating = this?.reviews?.reduce((acc, curr) => {
        return acc + curr.rating / this?.reviews?.length
    }, 0);
    return Number(averageRating).toFixed(2);
});


module.exports = mongoose.model('Product', ProductSchema);
