import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    navClicked: false,
    adminClicked: false,
    filterClicked: false,
};

const toggleSlice = createSlice({
    name: 'isClicked',
    initialState,
    reducers: {
        handleNavClicked(state) {
            state.navClicked = !state.navClicked;
            state.adminClicked = false;
            state.filterClicked = false;
        },
        handleAdminClicked(state) {
            state.adminClicked = !state.adminClicked;
            state.navClicked = false;
        },
        handleFilterClicked(state) {
            state.filterClicked = !state.filterClicked;
            state.navClicked = false;
        },
    }
});


export const { handleNavClicked, handleAdminClicked, handleFilterClicked} = toggleSlice.actions;
export default toggleSlice.reducer;