import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetErrorAction, resetSuccessAction } from "../global/globalActions";


// Initial State
const initialState = {
    cartItems: [],
    loading: false,
    error: null,
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
};


// Add Product to Cart
export const addOrderToCartAction = createAsyncThunk("cart/add-to-cart", async (cartItem) => {
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
});
// Get Cart-Item from LocalStorage
export const cartItemFromLocalStorageAction = createAsyncThunk("cart/getOrderItems", async () => {
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    return cartItems;
});
// Change Order Total-Quantity
export const changeOrderItemQty = createAsyncThunk("cart/change-item-qty", async ({productId, totalQty}) => {
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    const newCartItems = cartItems?.map((item) => {
        if(item?._id?.toString() === productId?.toString()){
            // Get new price
            const newPrice = item?.price * totalQty;
            item.totalQty = Number(totalQty);
            item.totalPrice = newPrice;
        };
        return item;
    });
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
});
// Remove Order from Cart
export const removeOrderItemQty = createAsyncThunk("cart/remove-item-qty", async (productId) => {
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    const newItems = cartItems?.filter((item) => item?._id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(newItems));
});

// Slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    extraReducers: (builder) => {
        // Add to Cart 
        builder.addCase(addOrderToCartAction.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(addOrderToCartAction.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload;
                state.isAdded = true;
            })
            .addCase(addOrderToCartAction.rejected, (state, action) => {
                state.loading = false;
                state.cartItems = null;
                state.isAdded = false;
                state.error = action.payload;
            });

        // Read CartItems 
        builder.addCase(cartItemFromLocalStorageAction.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(cartItemFromLocalStorageAction.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload;
                state.isAdded = true;
            })
            .addCase(cartItemFromLocalStorageAction.rejected, (state, action) => {
                state.loading = false;
                state.cartItems = null;
                state.isAdded = false;
                state.error = action.payload;
            });

        // Reset 
        builder.addCase(resetSuccessAction.pending, (state) => {
            state.isAdded = false;
        });
        builder.addCase(resetErrorAction.pending, (state) => {
            state.error = null;
        });
    },
});

// Generate Reducer
const cartReducer = cartSlice.reducer;
export default cartReducer;