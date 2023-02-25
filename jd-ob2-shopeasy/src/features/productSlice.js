import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
};

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        selectedProducts: (state, action) => {
            state.products = action.payload;
        },
        quitProduct: (state, action) => {
            let pos = state.products.findIndex(e => e.id === action.payload.id);
            state.products.splice(pos, 1);
        },
        addProduct: (state, action) => {
            state.products.unshift(action.payload);
        },
    },
});

export const { selectedProducts, quitProduct, addProduct } = productSlice.actions;

export default productSlice.reducer;