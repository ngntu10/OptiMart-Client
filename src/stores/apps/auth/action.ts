import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'

// ** services
import { changePasswordMe, registerAuth, updateAuthMe } from 'src/services/auth'
import { TChangePassword } from 'src/types/auth'

export const registerAuthAsync = createAsyncThunk('auth/register', async (data: any) => {
  const response = await registerAuth(data)

  if (response) {
    console.log(response)
    return response
  }

  return {
    data: null,
    message: response?.message
  }
})

export const updateAuthMeAsync = createAsyncThunk('auth/update-info', async (data: any) => {
  const response = await updateAuthMe(data)
  if (response?.data) {
    return response
  }
  return {
    data: null,
    message: response?.response?.data?.message
  }
})

export const changePasswordMeAsync = createAsyncThunk('auth/change-password', async (data: TChangePassword) => {
  const response = (await changePasswordMe(data)) as any
  if (response.status == 200) {
    return {
      data: 1,
      response
    }
  }
  return {
    data: null,
    message: response.response.data?.message
  }
  // return response
})
