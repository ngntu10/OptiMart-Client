// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
// ** Actions
import { serviceName } from 'src/stores/order-product/actions'
const initialState = {
  orderItems: []
}
export const orderProductSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.orderItems = action.payload.orderItems
    }
  },
  extraReducers: builder => {}
})
export const { addProductToCart } = orderProductSlice.actions
export default orderProductSlice.reducer