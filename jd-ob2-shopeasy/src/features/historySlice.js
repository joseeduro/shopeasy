import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    history: [],
};

export const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        selectedHistory: (state, action) => {
            state.history.push(action.payload);
        },
        loadHistory: (state, action) => {
            state.history = action.payload;
        },
    },
});

export const { selectedHistory, loadHistory } = historySlice.actions;

export default historySlice.reducer;