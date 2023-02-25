import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loader: false,
};

export const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        startLoader: (state, action) => {
            state.loader = action.payload;
        },
    },
});

export const { startLoader } = loaderSlice.actions;

export default loaderSlice.reducer;