const dotenv = require('dotenv');
const Stripe = require("stripe");
dotenv.config();
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const Coupon = require('../models/Coupon');


// Todo: Stripe Instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);   

// Todo: Create New Order                  POST /api/v1/orders                  Private/Admin
exports.createOrderController = async (req, res) => {
    try {
        // Step 1. Get the Coupon
        // const { coupon } = req?.query;
        // const couponFound = await Coupon.findOne({ code: coupon?.toUpperCase() });
        // if (req?.query?.coupon && !couponFound) throw new Error("Coupon does not Exist");
        // if (couponFound?.isExpired) throw new Error("Coupon has Expired");
        // Get Discount
        // ! const discount = couponFound?.discount / 100;

        // Step 2. Get the payload (customer, orderItems, shippingAddress, totalPrice);
        const { orderItems, shippingAddress, totalPrice } = req.body;

        // Step 3. Find the User
        const user = await User.findById(req.userAuthId);

        // Step 4. Check if User has shippingAddress
        if (!user?.hasShippingAddress) throw new Error("Please provide Shipping Address");

        // Step 5. Check if the order is not empty
        if (orderItems?.length <= 0) throw new Error("No Order Items");

        // Step 6. Place/Create order - save into DataBase
        const order = await Order.create({
            user: user?._id,
            orderItems,
            shippingAddress,
            // ! totalPrice: couponFound ? totalPrice - (totalPrice * discount) : totalPrice,
            totalPrice: totalPrice,
        });

        // Step 7. Update the Product Quantity
        const products = await Product.find({ _id: { $in: orderItems } });
        orderItems?.map(async (order) => {
            const product = products?.find((product) => {
                return product?._id?.toString() === order?._id?.toString();
            });
            if (product) {
                product.totalSold += order.totalQty;
            }
            await product.save();
        });

        // Step 8. Push Order into User
        user?.orders?.push(order?._id);
        await user.save();

        // Step 9.  Make Payment (STRIPE)
        // Convert order items to have same structure that stripe need
        const convertedOrders = orderItems?.map((item) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item?.name,
                        description: item?.description,
                    },
                    unit_amount: item?.price * 100,
                },
                quantity: item?.totalQty,
            };
        });
        const session = await stripe.checkout.sessions.create({
            line_items: convertedOrders,
            metadata: {
                orderId: JSON.stringify(order?._id),
            },
            mode: 'payment',
            success_url: `${process.env.LOCAL}/success`,
            cancel_url: `${process.env.LOCAL}/cancel`,
        });
        res.send({ url: session.url })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error?.message
        });
    }
};


// Todo: Read All Orders                   GET /api/v1/orders                   Private/Admin
exports.getOrdersController = async (req, res) => {
    const orders = await Order.find().populate("user");
    res.status(200).json({
        status: "success",
        message: "Orders Fetched Succesfully",
        orders,
    });
};


// Todo: Read Single Order                 GET /api/v1/orders/:id               Private/Admin
exports.getOrderController = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json({
            status: "success",
            message: "Order Fetched Succesfully",
            order,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "Order not Found",
        });
    }
};


// Todo: Update Order                      PUT /api/v1/orders/:id               Private/Admin
exports.updateOrderController = async (req, res) => {
    const { status } = req.body;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            status,
        }, { new: true });

        res.status(200).json({
            status: "success",
            message: "Order Updated Succesfully",
            updatedOrder,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "Order not Found",
        });
    }
};


// Todo: Get Sales Sum of Orders           GET /api/v1/orders/totalSales         Private/Admin
exports.getSummaryController = async (req, res) => {
    // Get Order Summary
    const summary = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalSales: {
                    $sum: "$totalPrice",
                },
                minimumSales: {
                    $min: "$totalPrice",
                },
                maximumSales: {
                    $max: "$totalPrice",
                },
                averageSales: {
                    $avg: "$totalPrice",
                },
            },
        },
    ]);

    // Get Order Date
    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const saleToday = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: today,
                },
            },
        },
        {
            $group: {
                _id: null,
                totalSales: {
                    $sum: "totalPrice",
                },
            },
        },
    ]);

    // Send response
    res.status(200).json({
        succes: true,
        mesage: "Sum of orders",
        summary,
        saleToday,
    });
};