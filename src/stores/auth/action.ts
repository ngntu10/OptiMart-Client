import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'

// ** services
import { changeAvatar, changePasswordMe, registerAuth, registerAuthFacebook, registerAuthGoogle, updateAuthMe } from 'src/services/auth'
// ** Types
import { TChangePassword } from 'src/types/auth'

export const serviceName = 'role'

export const registerAuthAsync = createAsyncThunk(`${serviceName}/register`, async (data: any) => {
  const response = await registerAuth(data)

  if (response) {
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

export const registerAuthFacebookAsync = createAsyncThunk(`${serviceName}/register-facebook`, async (idToken: string) => {
  const response = await registerAuthFacebook(idToken)
  if (response?.data) {
    return response
  }
  return {
    data: null,
    message: response?.response?.data?.message,
    typeError: response?.response?.data?.typeError
  }
})


export const registerAuthGoogleAsync = createAsyncThunk(`${serviceName}/register-google`, async (idToken: string) => {
  const response = await registerAuthGoogle(idToken)
  if (response?.data) {
    return response
  }

  return {
    data: null,
    message: response?.response?.data?.message
  }
})

export const changeAvatarAsync = createAsyncThunk('auth/changAvatar', async (file: File) => {
  const response: any = await changeAvatar(file)
  return response
})
