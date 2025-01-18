import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import favSlice from "./slices/favSlice";
import * as recipeActions from './slices/recipeSlice';

const store = configureStore({
    reducer:{
        cart: cartSlice,
        fav: favSlice,
        recipes: recipeActions,
    },
})

export default store;
