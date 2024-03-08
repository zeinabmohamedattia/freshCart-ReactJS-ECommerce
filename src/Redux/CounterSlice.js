import { createSlice } from "@reduxjs/toolkit";
let initialState = {
    count: 0,
    userName:''
}
let counterSlice = createSlice({
    name: 'counterSlice',
    initialState,
    reducers: {
        increase: (state,action) => {
            state.count += 1
        },
        decrease: (state,action) => {
          state.count-=1
        },
        icreaseByAmmount: (state,action) => {
          state.count+=action.payload
        },
    }
})
export let counterReducer = counterSlice.reducer
export let { increase, decrease, icreaseByAmmount }=counterSlice.actions