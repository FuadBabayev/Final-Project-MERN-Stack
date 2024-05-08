const dotenv = require('dotenv');
const cors = require('cors');
const Stripe = require("stripe");
dotenv.config();
const express = require('express');
const dbConnect = require('../config/dbConnect');
const usersRouter = require('../routes/usersRoute');
const productRouter = require('../routes/productsRoute');
const { globalErrhandler, notFound } = require('../middlewares/globalErrHandler');
const categoryRouter = require('../routes/categoriesRoute');
const brandRouter = require('../routes/brandsRoute');
const colorRouter = require('../routes/colorsRoute');
const reviewRouter = require('../routes/reviewsRoute');
const orderRouter = require('../routes/ordersRoute');
const couponRouter = require('../routes/couponsRoute');
const Order = require('../models/Order');
dbConnect();
const app = express();
// cors (Allows any Client Side to access our API)
app.use(cors());


// Stripe WebHook. This is your Stripe CLI webhook secret for testing your endpoint locally.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = "whsec_b22c3d5bee6f5be910a8c8a846e8bc42fc3711f2296d10a0aab192919c46ebe1";
app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    // Handle the event
    if (event.type === "checkout.session.completed") {
        // Update The Order
        const session = event.data.object;
        const { orderId } = session.metadata;
        const paymentStatus = session.payment_status;
        const paymentMethod = session.payment_method_types[0];
        const totalAmount = session.amount_total;
        const currency = session.currency;
        // Find The Order
        const order = await Order.findByIdAndUpdate(JSON.parse(orderId), {
            totalPrice: totalAmount / 100,
            currency,
            paymentMethod,
            paymentStatus,
        }, { new: true });
    } else {
        return;
    }
    response.send();
});

app.use(express.json());

// Server Static Files (Home Route)
app.use("/", express.static("public"));

// Routes
app.use('/api/v1/users/', usersRouter);
app.use('/api/v1/products/', productRouter);
app.use('/api/v1/categories/', categoryRouter);
app.use('/api/v1/brands/', brandRouter);
app.use('/api/v1/colors/', colorRouter);
app.use('/api/v1/reviews/', reviewRouter);
app.use('/api/v1/orders/', orderRouter);
app.use('/api/v1/coupons/', couponRouter);

// Error middleware (Always below Routes)
app.use(notFound);              // If there is error it will send it into globalErrhandler
app.use(globalErrhandler);

module.exports = app;