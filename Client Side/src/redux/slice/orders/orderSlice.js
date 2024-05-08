import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrorAction, resetSuccessAction } from "../global/globalActions";

// Initial State
const initialState = {
    orders: [],
    order: null,
    statistics: null,
    loading: false,
    error: null,
    isAdded: false,
    isUpdated: false,
};

// Place Order Action
export const placeOrderAction = createAsyncThunk("order/place-order", async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const { orderItems, shippingAddress, totalPrice } = payload;
        // Token Authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        // ! Axios
        const { data } = await axios.post(`${baseURL}/orders`, { orderItems, shippingAddress, totalPrice }, config);
        return window.open(data?.url);
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

// Read Orders Action
export const fetchOrdersAction = createAsyncThunk("order/readAll", async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        // Token Authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        // ! Axios
        const { data } = await axios.get(`${baseURL}/orders`, config);
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

// Read Orders Statistics Action
export const fetchOrdersStatisticsAction = createAsyncThunk("order/statistics", async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        // Token Authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.get(`${baseURL}/orders/sales/summary`, config);
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

// Read Single Order Action
export const fetchOrderAction = createAsyncThunk("order/readOne", async (productId, { rejectWithValue, getState, dispatch }) => {
    try {
        // Token Authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        // ! Axios
        const { data } = await axios.get(`${baseURL}/orders/${productId}`, config);
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

// Update Order Action
export const updateOrderAction = createAsyncThunk("order/update-order", async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const { status, id } = payload;
        // Token Authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        // ! Axios
        const { data } = await axios.put(`${baseURL}/orders/${id}`, { status }, config);
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

// Slice
const orderSlice = createSlice({
    name: 'orders',
    initialState,
    extraReducers: (builder) => {
        // Create Order
        builder.addCase(placeOrderAction.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(placeOrderAction.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
                state.isAdded = true;
            })
            .addCase(placeOrderAction.rejected, (state, action) => {
                state.loading = false;
                state.order = null;
                state.isAdded = false;
                state.error = action.payload;
            });

        // Read All Orders
        builder.addCase(fetchOrdersAction.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(fetchOrdersAction.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrdersAction.rejected, (state, action) => {
                state.loading = false;
                state.orders = null;
                state.error = action.payload;
            });

        // Read Single Order
        builder.addCase(fetchOrderAction.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(fetchOrderAction.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(fetchOrderAction.rejected, (state, action) => {
                state.loading = false;
                state.order = null;
                state.error = action.payload;
            });

        // Read Orders Statistics
        builder.addCase(fetchOrdersStatisticsAction.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(fetchOrdersStatisticsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.statistics = action.payload;
            })
            .addCase(fetchOrdersStatisticsAction.rejected, (state, action) => {
                state.loading = false;
                state.statistics = null;
                state.error = action.payload;
            });

        // Update Orders
        builder.addCase(updateOrderAction.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(updateOrderAction.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(updateOrderAction.rejected, (state, action) => {
                state.loading = false;
                state.order = null;
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
const orderReducer = orderSlice.reducer;
export default orderReducer;