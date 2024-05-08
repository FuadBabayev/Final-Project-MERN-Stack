import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetErrorAction, resetSuccessAction } from "../global/globalActions";
import baseURL from "../../../utils/baseURL";
import axios from "axios";


// Initial State
const initialState = {
    reviews: [],
    review: {},
    loading: false,
    error: null,
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
};


// Create Review Action
export const createReviewAction = createAsyncThunk("review/create", async ({ rating, message, id }, { rejectWithValue, getState, dispatch }) => {
    try {
        // Token Authenticated
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        // ! Axios
        const { data } = await axios.post(`${baseURL}/reviews/${id}`, { rating, message }, config);
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});


// Slice
const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    extraReducers: (builder) => {
        // Create Review
        builder.addCase(createReviewAction.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(createReviewAction.fulfilled, (state, action) => {
                state.loading = false;
                state.review = action.payload;
                state.isAdded = true;
            })
            .addCase(createReviewAction.rejected, (state, action) => {
                state.loading = false;
                state.review = null;
                state.isAdded = false;
                state.error = action.payload;
            });

        // Reset
        builder.addCase(resetSuccessAction.pending, (state, action) => {
            state.isAdded = false;
        });
        builder.addCase(resetErrorAction.pending, (state, action) => {
            state.error = null;
        });
    },
});

// Generate Reducer
const reviewReducer = reviewSlice.reducer;
export default reviewReducer;