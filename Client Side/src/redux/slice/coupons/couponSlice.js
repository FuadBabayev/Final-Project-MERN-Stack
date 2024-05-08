import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetErrorAction, resetSuccessAction } from "../global/globalActions";
import baseURL from "../../../utils/baseURL";
import axios from "axios";


// Initial State
const initialState = {
    coupons: [],
    coupon: null,
    loading: false,
    error: null,
    isAdded: false,
    isApplyed: false,
    isUpdated: false,
    isDeleted: false,
};


// Create Coupon Action
export const createCouponAction = createAsyncThunk("coupons/create", async ({ code, discount, startDate, endDate }, { rejectWithValue, getState, dispatch }) => {
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.post(`${baseURL}/coupons`, { code, discount, startDate, endDate }, config);
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

// Read All Coupons Action
export const fetchCouponsAction = createAsyncThunk("coupons/readAll", async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const { data } = await axios.get(`${baseURL}/coupons`);
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

// Read Single Coupon Action
export const fetchCouponAction = createAsyncThunk("coupons/readOne", async (code, { rejectWithValue, getState, dispatch }) => {
    try {
        // ! Axios
        const { data } = await axios.get(`${baseURL}/coupons/single?code=${code}`, { code });
        return data;

        // ! Fetch
        // const res = await fetch(`${baseURL}/coupons`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        // })
        // const data = await res.json();
        // return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

// Update Coupon Action
export const updateCouponAction = createAsyncThunk("coupons/update", async ({ code, discount, startDate, endDate, id }, { rejectWithValue, getState, dispatch }) => {
    try {
        // Token Authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.put(`${baseURL}/coupons/${id}`, { code, discount, startDate, endDate }, config);
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

// Delete Coupon Action
export const deleteCouponAction = createAsyncThunk("coupons/delete", async (id, { rejectWithValue, getState, dispatch }) => {
    try {
        // Token Authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        // ! Axios
        const { data } = await axios.delete(`${baseURL}/coupons/${id}`, config);
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

// Slice
const couponSlice = createSlice({
    name: 'coupons',
    initialState,
    extraReducers: (builder) => {
        // Create Coupon
        builder.addCase(createCouponAction.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(createCouponAction.fulfilled, (state, action) => {
                state.loading = false;
                state.coupon = action.payload;
                state.isAdded = true;
            })
            .addCase(createCouponAction.rejected, (state, action) => {
                state.loading = false;
                state.coupon = null;
                state.isAdded = false;
                state.error = action.payload;
            });

        // Read All Coupons
        builder.addCase(fetchCouponsAction.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(fetchCouponsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.coupons = action.payload;
            })
            .addCase(fetchCouponsAction.rejected, (state, action) => {
                state.loading = false;
                state.coupons = null; 
                state.error = action.payload;
            });

        // Read Single Coupon
        builder.addCase(fetchCouponAction.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(fetchCouponAction.fulfilled, (state, action) => {
                state.loading = false;
                state.coupon = action.payload;
                state.isApplyed = true;
            })
            .addCase(fetchCouponAction.rejected, (state, action) => {
                state.loading = false;
                state.coupon = null;
                state.error = action.payload;
            });

        // Update Coupon
        builder.addCase(updateCouponAction.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(updateCouponAction.fulfilled, (state, action) => {
                state.loading = false;
                state.coupon = action.payload;
                state.isUpdated = true;
            })
            .addCase(updateCouponAction.rejected, (state, action) => {
                state.loading = false;
                state.coupon = null;
                state.isUpdated = false;
                state.error = action.payload;
            });

        // Delete Coupon
        builder.addCase(deleteCouponAction.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(deleteCouponAction.fulfilled, (state, action) => {
                state.loading = false;
                state.isDeleted = true;
            })
            .addCase(deleteCouponAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Reset
        builder.addCase(resetSuccessAction.pending, (state, action) => {
            state.isAdded = false;
            state.isApplyed = false;
            state.isUpdated = false;
            state.isDeleted = false;

        });
        builder.addCase(resetErrorAction.pending, (state, action) => {
            state.error = null;
        });
    },
});

// Generate Reducer
const couponReducer = couponSlice.reducer;
export default couponReducer;