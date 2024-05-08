import { createAsyncThunk } from "@reduxjs/toolkit";

// Reset Error Action
export const resetErrorAction = createAsyncThunk("resetErrorAction", () => {
    return {};
});

// Reset Success Action
export const resetSuccessAction = createAsyncThunk("resetSuccessAction", () => {
    return {};
});