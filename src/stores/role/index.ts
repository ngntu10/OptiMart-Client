// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { createRoleAsync, deleteRoleAsync, getAllRolesAsync, updateRoleAsync } from './action'

interface DataParams {
  q: string
  role: string
  status: string
  currentPlan: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

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
  roles: {
    data: [],
    total: 0
  }
}

export const roleSlice = createSlice({
  name: 'auth',
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
    }
  },
  extraReducers: builder => {
    // ** get all roles
    builder.addCase(getAllRolesAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllRolesAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.roles.data = action.payload.data?.data.roleList
      state.roles.total = action.payload.data?.data.totalCount
    })
    builder.addCase(getAllRolesAsync.rejected, (state, action) => {
      state.isLoading = false
      state.roles.data = []
      state.roles.total = 0
    })

    // ** create role
    builder.addCase(createRoleAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createRoleAsync.fulfilled, (state, action) => {
      console.log(action)
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data?.data?.id
      state.isErrorCreateEdit = !action.payload?.data?.data?.id
      state.messageErrorCreateEdit = action.payload?.data?.message
    })

    // ** update role
    builder.addCase(updateRoleAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateRoleAsync.fulfilled, (state, action) => {
      console.log(action)
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data?.data.id
      state.isErrorCreateEdit = !action.payload?.data?.data.id
      state.messageErrorCreateEdit = action.payload?.data.data.message
    })

    // ** delete role
    builder.addCase(deleteRoleAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteRoleAsync.fulfilled, (state, action) => {
      console.log(action)
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.data.data
      state.isErrorDelete = !action.payload?.data?.data
      state.messageErrorDelete = action.payload?.data.data.message
    })
  }
})

export const { resetInitialState } = roleSlice.actions
export default roleSlice.reducer