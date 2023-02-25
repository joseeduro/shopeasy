import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: "home",
};

export const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        actualPage: (state, action) => {
            state.page = action.payload;
        },
    },
});

export const { actualPage } = pageSlice.actions;

export default pageSlice.reducer;