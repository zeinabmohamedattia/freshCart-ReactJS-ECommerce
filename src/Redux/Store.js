import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./CounterSlice.js";
import { brandsReduser } from "./BrandsSlice.js";
import { categoriesReduser } from "./CategoriesSlice.js";

// store is wating the reduser
export let store = configureStore({
    reducer: {
        // reduser
        counter: counterReducer,
        brands:brandsReduser,
        category:categoriesReduser,
    }
})