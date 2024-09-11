// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import { changePasswordMeAsync, registerAuthAsync, serviceName, updateAuthMeAsync } from './action'

// ** Type
import { UserDataType } from 'src/contexts/types'

type TInitialData = {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  message: string
  typeError: string
  isSuccessUpdateMe: boolean
  isErrorUpdateMe: boolean
  messageUpdateMe: string
  isSuccessChangePassword: boolean
  isErrorChangePassword: boolean
  isSuccessChangeAvatar: boolean
  messageChangePassword: string
  userData: UserDataType | null
}
const initialState: TInitialData = {
  isLoading: false,
  isSuccess: true,
  isError: false,
  message: '',
  typeError: '',
  isSuccessUpdateMe: true,
  isErrorUpdateMe: false,
  messageUpdateMe: '',
  isSuccessChangePassword: true,
  isErrorChangePassword: false,
  isSuccessChangeAvatar: false,
  messageChangePassword: '',
  userData: null
}

export const authSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    resetInitialState: state => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message = ''
      state.isSuccessUpdateMe = false
      state.isErrorUpdateMe = true
      state.messageUpdateMe = ''
      state.isSuccessChangePassword = false
      state.isErrorChangePassword = true
      state.messageChangePassword = ''
    }
  },
  extraReducers: builder => {
    // ** register
    builder.addCase(registerAuthAsync.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(registerAuthAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = !!action.payload?.user?.email
      state.isError = !action.payload?.user?.email
      state.message = action.payload?.response?.data?.message || action.payload?.message
    })
    builder.addCase(registerAuthAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message = ''
    })

    // ** update me
    builder.addCase(updateAuthMeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateAuthMeAsync.fulfilled, (state, action) => {
      console.log('action', { action })
      state.isLoading = false
      state.isSuccessUpdateMe = !!action.payload?.data
      state.isErrorUpdateMe = !action.payload?.data
      state.messageUpdateMe = action.payload?.data?.message
      state.userData = action.payload.data.data
    })
    builder.addCase(updateAuthMeAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isSuccessUpdateMe = false
      state.isErrorUpdateMe = false
      state.messageUpdateMe = ''
      state.userData = null
    })

    // ** change password me
    builder.addCase(changePasswordMeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(changePasswordMeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessChangePassword = !!action.payload?.data
      state.isErrorChangePassword = !action.payload?.data
      state.messageChangePassword = action.payload?.message || action.payload?.response?.data?.message
    })
    builder.addCase(changePasswordMeAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isSuccessChangePassword = false
      state.isErrorChangePassword = false
      state.messageChangePassword = ''
    })
  }
})

export const { resetInitialState } = authSlice.actions
export default authSlice.reducer
