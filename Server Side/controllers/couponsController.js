const Coupon = require("../models/Coupon");


// Todo: Create New Coupon                 POST /api/v1/coupons                  Private/Admin
exports.createCouponController = async (req, res) => {
    const { code, startDate, endDate, discount } = req.body;
    try {
        // Check Coupon Exists
        const CouponExists = await Coupon.findOne({ code: code?.toUpperCase() });
        if (CouponExists) throw new Error('Coupon already exists');

        // Check if discount is a Number
        if (isNaN(discount)) throw new Error('Discount value must be a Number');

        // Create Coupon
        const coupon = await Coupon.create({
            code: code?.toUpperCase(),
            discount,
            startDate,
            endDate,
            user: req.userAuthId,
        });

        // Send response
        res.status(201).json({
            status: "success",
            message: "Coupon Created Succesfully",
            coupon,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error?.message
        });
    }
};


// Todo: Read All Coupons                  GET /api/v1/coupons                    Private/Admin
exports.getCouponsController = async (req, res) => {
    const coupons = await Coupon.find();
    res.status(200).json({
        status: "success",
        message: "Coupons Fetched Succesfully",
        results: coupons?.length,
        coupons,
    });
};


// Todo: Read Single Coupon                GET /api/v1/coupons/:id                Private/Admin
exports.getCouponController = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ code: req.query.code });
        // Check if expired/notFound
        if(!coupon) throw new Error('Coupon not Found');
        if(coupon?.isExpired) throw new Error('Coupon Expired');
        res.status(200).json({
            status: "success",
            message: "Coupon Fetched Succesfully",
            coupon,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail", 
            message: error?.message,
        });
    }
};


// Todo: Update Coupon                      PUT /api/v1/coupons/:id               Private/Admin
exports.updateCouponController = async (req, res) => {
    const { code, startDate, endDate, discount } = req.body;
    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, {
            code: code?.toUpperCase(),
            startDate,
            endDate,
            discount
        }, { new: true });

        res.status(200).json({
            status: "success",
            message: "Coupon Updated Succesfully",
            updatedCoupon,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "Coupon not Found",
        });
    }
};


// Todo: Delete Coupon                     DELETE /api/v1/coupons/:id            Private/Admin
exports.deleteCouponController = async (req, res) => {
    try {
        await Coupon.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: "success",
            message: 'Coupon Deleted Successfully',
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "Coupon not Found",
        });
    }
};