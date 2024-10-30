// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
// ** Actions
import {
  createCommentAsync,
  deleteCommentAsync,
  deleteMultipleCommentAsync,
  getAllCommentCMSAsync,
  replyCommentAsync,
  serviceName,
  updateCommentAsync
} from 'src/stores/comment/actions'

const initialState = {
  isSuccessCreate: false,
  isErrorCreate: false,
  messageErrorCreate: '',
  isSuccessReply: false,
  isErrorReply: false,
  messageErrorReply: '',
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
  comments: {
    data: [],
    total: 0
  }
}
export const commentSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    resetInitialState: state => {
      state.isSuccessCreate = false
      state.isErrorCreate = true
      state.messageErrorCreate = ''
      state.isSuccessReply = false
      state.isErrorReply = true
      state.messageErrorReply = ''
      state.typeError = ''
      state.isLoading = false
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
    // ** get all comment
    builder.addCase(getAllCommentCMSAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllCommentCMSAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.comments.data = action.payload?.data?.comments || []
      state.comments.total = action.payload?.data?.totalCount
    })
    builder.addCase(getAllCommentCMSAsync.rejected, (state, action) => {
      state.isLoading = false
      state.comments.data = []
      state.comments.total = 0
    })
    // ** create comment
    builder.addCase(createCommentAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createCommentAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreate = !!action.payload?.data?.id
      state.isErrorCreate = !action.payload?.data?.id
      state.messageErrorCreate = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    // ** reply comment
    builder.addCase(replyCommentAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(replyCommentAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessReply = !!action.payload?.data?.id
      state.isErrorReply = !action.payload?.data?.id
      state.messageErrorReply = action.payload?.message
      state.typeError = action.payload?.typeError
    })


    // ** update comment
    builder.addCase(updateCommentAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateCommentAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessEdit = !!action.payload?.data?.id
      state.isErrorEdit = !action.payload?.data?.id
      state.messageErrorEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    // ** delete comment
    builder.addCase(deleteCommentAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteCommentAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.data?.id
      state.isErrorDelete = !action.payload?.data?.id
      state.messageErrorDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    // // ** delete my review
    // builder.addCase(deleteMyReviewAsync.pending, (state, action) => {
    //   state.isLoading = true
    // })
    // builder.addCase(deleteMyReviewAsync.fulfilled, (state, action) => {
    //   state.isLoading = false
    //   state.isSuccessDelete = !!action.payload?.data?.id
    //   state.isErrorDelete = !action.payload?.data?.id
    //   state.messageErrorDelete = action.payload?.message
    //   state.typeError = action.payload?.typeError
    // })
    // // ** update my review
    // builder.addCase(updateMyReviewAsync.pending, (state, action) => {
    //   state.isLoading = true
    // })
    // builder.addCase(updateMyReviewAsync.fulfilled, (state, action) => {
    //   state.isLoading = false
    //   state.isSuccessEdit = !!action.payload?.data?.id
    //   state.isErrorEdit = !action.payload?.data?.id
    //   state.messageErrorEdit = action.payload?.message
    //   state.typeError = action.payload?.typeError
    // })
    // ** delete multiple comment
    builder.addCase(deleteMultipleCommentAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteMultipleCommentAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessMultipleDelete = !!action.payload?.data
      state.isErrorMultipleDelete = !action.payload?.data
      state.messageErrorMultipleDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
  }
})
export const { resetInitialState } = commentSlice.actions
export default commentSlice.reducer
