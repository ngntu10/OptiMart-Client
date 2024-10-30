// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
// ** Actions
import {
  createReviewAsync,
  deleteMultipleReviewAsync,
  deleteMyReviewAsync,
  deleteReviewAsync,
  getAllReviewAsync,
  serviceName,
  updateMyReviewAsync,
  updateReviewAsync
} from 'src/stores/reviews/actions'
const initialState = {
  isSuccessCreate: false,
  isErrorCreate: false,
  messageErrorCreate: '',
  isSuccessCancelMe: false,
  isErrorCancelMe: false,
  messageErrorCancelMe: '',
  isSuccessEdit: false,
  isErrorEdit: false,
  messageErrorEdit: '',
  isSuccessDelete: false,
  isErrorDelete: false,
  messageErrorDelete: '',
  isSuccessMultipleDelete: false,
  isErrorMultipleDelete: false,
  messageErrorMultipleDelete: '',
  isLoading: false,
  typeError: '',
  reviews: {
    data: [],
    total: 0
  }
}
export const reviewSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
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
      state.isErrorEdit = true
      state.messageErrorEdit = ''
      state.isSuccessDelete = false
      state.isErrorDelete = true
      state.messageErrorDelete = ''
      state.isSuccessMultipleDelete = false
      state.isErrorMultipleDelete = true
      state.messageErrorMultipleDelete = ''
    }
  },
  extraReducers: builder => {
    // ** get all review
    builder.addCase(getAllReviewAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllReviewAsync.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false
      state.reviews.data = action.payload?.data || []
      state.reviews.total = action.payload?.data?.totalCount
    })
    builder.addCase(getAllReviewAsync.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false
      state.reviews.data = []
      state.reviews.total = 0
    })
    // ** create review
    builder.addCase(createReviewAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createReviewAsync.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false
      state.isSuccessCreate = !!action.payload?.data?.id
      state.isErrorCreate = !action.payload?.data?.id
      state.messageErrorCreate = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    // ** update review
    builder.addCase(updateReviewAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateReviewAsync.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false
      state.isSuccessEdit = !!action.payload?.data?.id
      state.isErrorEdit = !action.payload?.data?.id
      state.messageErrorEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    // ** delete review
    builder.addCase(deleteReviewAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteReviewAsync.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.data?.id
      state.isErrorDelete = !action.payload?.data?.id
      state.messageErrorDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    // ** delete my review
    builder.addCase(deleteMyReviewAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteMyReviewAsync.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.data?.id
      state.isErrorDelete = !action.payload?.data?.id
      state.messageErrorDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    // ** update my review
    builder.addCase(updateMyReviewAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateMyReviewAsync.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false
      state.isSuccessEdit = !!action.payload?.data?.id
      state.isErrorEdit = !action.payload?.data?.id
      state.messageErrorEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    // ** delete multiple review
    builder.addCase(deleteMultipleReviewAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteMultipleReviewAsync.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false
      state.isSuccessMultipleDelete = !!action.payload?.data?.id
      state.isErrorMultipleDelete = !action.payload?.data?.id
      state.messageErrorMultipleDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
  }
})
export const { resetInitialState } = reviewSlice.actions
export default reviewSlice.reducer