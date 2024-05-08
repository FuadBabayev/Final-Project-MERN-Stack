import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slice/users/usersSlice";
import toggleReducer from "../slice/toggle/toggleSlice";
import productReducer from "../slice/products/productSlice";
import categoryReducer from "../slice/categories/categorySlice";
import brandReducer from "../slice/brands/brandSlice";
import colorReducer from "../slice/colors/colorSlice";
import cartReducer from "../slice/cart/cartSlice";
import couponReducer from "../slice/coupons/couponSlice";
import orderReducer from "../slice/orders/orderSlice";
import reviewReducer from "../slice/reviews/reviewSlice";

// Store
const store = configureStore({
    reducer: {
        toggle: toggleReducer,
        users: usersReducer,
        products: productReducer,
        categories: categoryReducer,
        brands: brandReducer,
        colors: colorReducer,
        carts: cartReducer,
        coupons: couponReducer,
        orders: orderReducer,
        reviews: reviewReducer,
    },
});

export default store;   