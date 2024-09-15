// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Actions
import {
  createUserAsync,
  deleteMultipleUserAsync,
  deleteUserAsync,
  getAllUsersAsync,
  serviceName,
  updateUserAsync
} from 'src/stores/user/actions'

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
  users: {
    data: [],
    total: 0
  }
}

export const userSlice = createSlice({
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
    // ** get all users
    builder.addCase(getAllUsersAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllUsersAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.users.data = action.payload?.data || []
      state.users.total = action.payload?.totalCount
    })
    builder.addCase(getAllUsersAsync.rejected, (state, action) => {
      state.isLoading = false
      state.users.data = []
      state.users.total = 0
    })

    // ** create user
    builder.addCase(createUserAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createUserAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data.data?.id
      state.isErrorCreateEdit = !action.payload?.data?.data?.id
      state.messageErrorCreateEdit = action.payload?.data.message
    })

    // ** update user
    builder.addCase(updateUserAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateUserAsync.fulfilled, (state, action) => {
      console.log(action)
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data?.data.id
      state.isErrorCreateEdit = !action.payload?.data?.data.id
      state.messageErrorCreateEdit = action.payload?.data?.message
      state.typeError = action.payload?.typeError
    })

    // ** delete user
    builder.addCase(deleteUserAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteUserAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.data?.id
      state.isErrorDelete = !action.payload?.data?.id
      state.messageErrorDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // ** delete multiple user
    builder.addCase(deleteMultipleUserAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteMultipleUserAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessMultipleDelete = !!action.payload?.data
      state.isErrorMultipleDelete = !action.payload?.data
      state.messageErrorMultipleDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
  }
})

export const { resetInitialState } = userSlice.actions
export default userSlice.reducer
