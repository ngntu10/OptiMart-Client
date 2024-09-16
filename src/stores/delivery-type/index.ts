// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Actions
import {
  createDeliveryTypeAsync,
  deleteMultipleDeliveryTypeAsync,
  deleteDeliveryTypeAsync,
  getAllDeliveryTypesAsync,
  serviceName,
  updateDeliveryTypeAsync
} from 'src/stores/delivery-type/actions'

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
  deliveryTypes: {
    data: [],
    total: 0
  }
}

export const deliveryTypeSlice = createSlice({
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
    // ** get all delivery types
    builder.addCase(getAllDeliveryTypesAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllDeliveryTypesAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.deliveryTypes.data = action.payload?.data?.deliveryTypes || []
      state.deliveryTypes.total = action.payload?.data?.totalCount
    })
    builder.addCase(getAllDeliveryTypesAsync.rejected, (state, action) => {
      state.isLoading = false
      state.deliveryTypes.data = []
      state.deliveryTypes.total = 0
    })

    // ** create delivery type
    builder.addCase(createDeliveryTypeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createDeliveryTypeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data?._id
      state.isErrorCreateEdit = !action.payload?.data?._id
      state.messageErrorCreateEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // ** update delivery type
    builder.addCase(updateDeliveryTypeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateDeliveryTypeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data?._id
      state.isErrorCreateEdit = !action.payload?.data?._id
      state.messageErrorCreateEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // ** delete delivery type
    builder.addCase(deleteDeliveryTypeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteDeliveryTypeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.data?._id
      state.isErrorDelete = !action.payload?.data?._id
      state.messageErrorDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // ** delete multiple delivery type
    builder.addCase(deleteMultipleDeliveryTypeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteMultipleDeliveryTypeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessMultipleDelete = !!action.payload?.data
      state.isErrorMultipleDelete = !action.payload?.data
      state.messageErrorMultipleDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
  }
})

export const { resetInitialState } = deliveryTypeSlice.actions
export default deliveryTypeSlice.reducer
