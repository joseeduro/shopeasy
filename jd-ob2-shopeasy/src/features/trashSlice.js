import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    trash: [],
};

export const trashSlice = createSlice({
    name: "trash",
    initialState,
    reducers: {
        selectedTrash: (state, action) => {
            state.trash.push(action.payload);
        },
        loadTrash: (state, action) => {
            state.trash = action.payload;
        },
    },
});

export const { selectedTrash, loadTrash } = trashSlice.actions;

export default trashSlice.reducer;