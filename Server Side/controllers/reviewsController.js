const Product = require("../models/Product");
const Review = require("../models/Review");


// Todo: Create New Review                  POST /api/v1/reviews                  Private/Admin
exports.createReviewController = async (req, res) => {
    const { product, message, rating } = req.body;
    try {
        // Find the Product 
        const { productID } = req.params;
        const productFound = await Product.findById(productID).populate("reviews");

        // Check if user already reviewed this product
        const hasReviewed = productFound?.reviews?.find((review) => {
            return review?.user?.toString() === req?.userAuthId?.toString();
        });
        if (hasReviewed) throw new Error("You have already reviewed this product");

        // Create Review
        const review = await Review.create({
            message,
            rating,
            product: productFound?._id,
            user: req.userAuthId,
        });

        // Push the Review into Product and Resave
        productFound?.reviews.push(review?._id);
        await productFound.save();

        // Send response
        res.status(201).json({
            status: "success",
            message: "Review Created Succesfully",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error?.message,
        });
    }
};