// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { getAllOrderProducts } from 'src/services/order-product'

// ** Actions
import {
  cancelOrderProductOfMeAsync,
  createOrderProductAsync,
  deleteOrderProductAsync,
  getAllOrderProductsAsync,
  getAllOrderProductsByMeAsync,
  serviceName,
  updateOrderProductAsync,
  updateStatusOrderProductAsync
} from 'src/stores/order-product/actions'

const initialState = {
  isSuccessCreate: false,
  isErrorCreate: false,
  messageErrorCreate: '',
  isSuccessCancelMe: false,
  isErrorCancelMe: false,
  messageErrorCancelMe: '',
  isSuccessEdit: false,
  isErrorEdit: false,
  isSuccessUpdate: false,
  messageErrorEdit: '',
  isSuccessDelete: false,
  isErrorDelete: false,
  messageErrorDelete: '',
  isLoading: false,
  typeError: '',
  orderItems: [],
  orderProducts: {
    data: [],
    total: 0
  },
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
      state.isSuccessCancelMe = false
      state.isErrorCancelMe = true
      state.messageErrorCancelMe = ''
      state.isSuccessEdit = false
      state.isSuccessUpdate = false
      state.isErrorEdit = true
      state.messageErrorEdit = ''
      state.isSuccessDelete = false
      state.isErrorDelete = true
      state.messageErrorDelete = ''
    }
  },
  extraReducers: builder => {
    // ** get all order products by me
    builder.addCase(getAllOrderProductsByMeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllOrderProductsByMeAsync.fulfilled, (state, action) => {
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
    })

    // ** cancel order product of me
    builder.addCase(cancelOrderProductOfMeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(cancelOrderProductOfMeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCancelMe = !!action.payload?.data?.id
      state.isErrorCancelMe = !action.payload?.data?.id
      state.messageErrorCancelMe = action.payload?.message
      state.typeError = action.payload?.typeError
    }) // ** get all order products
    builder.addCase(getAllOrderProductsAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllOrderProductsAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.orderProducts.data = action.payload?.data || []
      state.orderProducts.total = action.payload?.totalCount
    })
    builder.addCase(getAllOrderProductsAsync.rejected, (state, action) => {
      state.isLoading = false
      state.orderProducts.data = []
      state.orderProducts.total = 0
    })

    // ** update order product
    builder.addCase(updateOrderProductAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateOrderProductAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessEdit = !!action.payload?.data?.id
      state.isErrorEdit = !action.payload?.data?.id
      state.messageErrorEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // ** update status order product
    builder.addCase(updateStatusOrderProductAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateStatusOrderProductAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessUpdate = !!action.payload?.data?.id
      state.isSuccessEdit = !!action.payload?.data?.id
      state.isErrorEdit = !action.payload?.data?.id
      state.messageErrorEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // ** delete orders product
    builder.addCase(deleteOrderProductAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteOrderProductAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.data
      state.isErrorDelete = !action.payload?.data
      state.messageErrorDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
  }
})

export const { resetInitialState } = orderProductSlice.actions
export const { updateProductToCart } = orderProductSlice.actions
export default orderProductSlice.reducer
