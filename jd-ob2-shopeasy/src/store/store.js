import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/productSlice";
import loaderReducer from "../features/loaderSlice";
import favsReducer from "../features/favsSlice";
import trashReducer from "../features/trashSlice";
import historyReducer from "../features/historySlice";
import pageReducer from "../features/actualPageSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        loader: loaderReducer,
        favs: favsReducer,
        trash: trashReducer,
        history: historyReducer,
        page: pageReducer
    }
})