// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Actions
import { createOrderProductAsync, getAllOrderProductsByMeAsync, serviceName } from 'src/stores/order-product/actions'

const initialState = {
  isSuccessCreate: false,
  isErrorCreate: false,
  messageErrorCreate: '',
  isLoading: false,
  typeError: '',
  orderItems: [],
  ordersOfMe: {
    data: [],
    total: 0
  }
}

export const orderProductSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    updateProductToCart: (state, action) => {
      state.orderItems = action.payload.orderItems
    },
    resetInitialState: state => {
      state.isSuccessCreate = false
      state.isErrorCreate = true
      state.messageErrorCreate = ''
      state.typeError = ''
      state.isLoading = false
    }
  },
  extraReducers: builder => {
    // ** get all order products by me
    builder.addCase(getAllOrderProductsByMeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllOrderProductsByMeAsync.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false
      state.ordersOfMe.data = action.payload?.data || []
      state.ordersOfMe.total = action.payload?.data?.totalCount
    })
    builder.addCase(getAllOrderProductsByMeAsync.rejected, (state, action) => {
      state.isLoading = false
      state.ordersOfMe.data = []
      state.ordersOfMe.total = 0
    })
    // ** create order product
    builder.addCase(createOrderProductAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createOrderProductAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreate = !!action.payload?.data
      state.isErrorCreate = !action.payload?.data
      state.messageErrorCreate = action.payload?.data?.data?.message
      // state.typeError = action.payload?.typeError
    })
  }
})

export const { updateProductToCart, resetInitialState } = orderProductSlice.actions
export default orderProductSlice.reducer
