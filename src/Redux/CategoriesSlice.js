import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export let initialState = { categories: [], error: null, isLoading: false, subCategories: [], currentCategory: [] }
export let getCategories = createAsyncThunk('categoriesSlice/getCategories',
    async () => {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
            .catch(error => error)
        return data?.data
    }
)
export let getSubCategories = createAsyncThunk('categoriesSlice/getSubCategories',
    async (id) => {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
            .catch(error => error)
        return data?.data
    }
)
export let getCurrentCategory = createAsyncThunk('categoriesSlice/getCurrentCategory',
    async (id) => {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
            .catch(error => error)
        return data?.data
    }
)
let categoriesSlice = createSlice({
    name: 'categoriesSlice',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload
            state.isLoading = false

        });
        builder.addCase(getSubCategories.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(getSubCategories.fulfilled, (state, action) => {
            state.subCategories = action.payload
            state.isLoading = false

        });
        builder.addCase(getCurrentCategory.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(getCurrentCategory.fulfilled, (state, action) => {
            state.currentCategory = action.payload
            state.isLoading = false

        });
    }
})
export let categoriesReduser = categoriesSlice.reducer