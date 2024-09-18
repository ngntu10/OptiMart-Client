// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Actions
import {
  createProductTypeAsync,
  deleteMultipleProductTypeAsync,
  deleteProductTypeAsync,
  getAllProductTypesAsync,
  serviceName,
  updateProductTypeAsync
} from 'src/stores/product-type/actions'

const initialState = {
  isLoading: false,
  isSuccess: true,
  isError: false,
  message: '',
  typeError: '',
  isSuccessCreateEdit: false,
  isErrorCreateEdit: false,
  messageErrorCreateEdit: '',
  isSuccessDelete: false,
  isErrorDelete: false,
  messageErrorDelete: '',
  isSuccessMultipleDelete: false,
  isErrorMultipleDelete: false,
  messageErrorMultipleDelete: '',
  productTypes: {
    data: [],
    total: 0
  }
}

export const productTypeSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    resetInitialState: state => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message = ''
      state.typeError = ''
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = true
      state.messageErrorCreateEdit = ''
      state.isSuccessDelete = false
      state.isErrorDelete = true
      state.messageErrorDelete = ''
      state.isSuccessMultipleDelete = false
      state.isErrorMultipleDelete = true
      state.messageErrorMultipleDelete = ''
    }
  },
  extraReducers: builder => {
    // ** get all Product types
    builder.addCase(getAllProductTypesAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllProductTypesAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.productTypes.data = action.payload?.data?.productTypes || []
      state.productTypes.total = action.payload?.data?.totalCount
    })
    builder.addCase(getAllProductTypesAsync.rejected, (state, action) => {
      state.isLoading = false
      state.productTypes.data = []
      state.productTypes.total = 0
    })

    // ** create Product type
    builder.addCase(createProductTypeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createProductTypeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data?._id
      state.isErrorCreateEdit = !action.payload?.data?._id
      state.messageErrorCreateEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // ** update Product type
    builder.addCase(updateProductTypeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateProductTypeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data?._id
      state.isErrorCreateEdit = !action.payload?.data?._id
      state.messageErrorCreateEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // ** delete Product type
    builder.addCase(deleteProductTypeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteProductTypeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.data?._id
      state.isErrorDelete = !action.payload?.data?._id
      state.messageErrorDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // ** delete multiple Product type
    builder.addCase(deleteMultipleProductTypeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteMultipleProductTypeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessMultipleDelete = !!action.payload?.data
      state.isErrorMultipleDelete = !action.payload?.data
      state.messageErrorMultipleDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
  }
})

export const { resetInitialState } = productTypeSlice.actions
export default productTypeSlice.reducer
