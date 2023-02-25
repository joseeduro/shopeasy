import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favs: [],
};

export const favsSlice = createSlice({
    name: "favs",
    initialState,
    reducers: {
        selectedFavs: (state, action) => {
            state.favs.push(action.payload);
        },
        loadFavs: (state, action) => {
            state.favs = action.payload;
        },
        quitFav: (state, action) => {
            let pos = state.favs.findIndex(e => e.id === action.payload.id);
            state.favs.splice(pos, 1);
        },
    },
});

export const { selectedFavs, loadFavs, quitFav } = favsSlice.actions;

export default favsSlice.reducer;