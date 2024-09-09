import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'

// ** services
import { changeAvatar, changePasswordMe, registerAuth, updateAuthMe } from 'src/services/auth'

// ** Types
import { TChangePassword } from 'src/types/auth'

export const serviceName = 'role'

export const registerAuthAsync = createAsyncThunk(`${serviceName}/register`, async (data: any) => {
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

export const updateAuthMeAsync = createAsyncThunk(`${serviceName}/update-me`, async (data: any) => {
  const response = (await updateAuthMe(data)) as any
  if (response) {
    return response
  }
  return {
    data: null,
    message: response
  }
})

export const changePasswordMeAsync = createAsyncThunk(
  `${serviceName}/change-password-me`,
  async (data: TChangePassword) => {
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
  }
)

export const changeAvatarAsync = createAsyncThunk('auth/changAvatar', async (file: File) => {
  const response: any = await changeAvatar(file)
  return response
})
