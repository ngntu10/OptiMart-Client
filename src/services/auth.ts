/* eslint-disable newline-before-return */
import axios, { AxiosError } from 'axios'

// ** Config
import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'

// ** Types
import { TLoginAuth, TRegisterAuth, TChangePassword, TForgotPasswordAuth, TResetPasswordAuth } from 'src/types/auth'

export const loginAuth = async (data: TLoginAuth) => {
  try {
    const res = await axios.post(`${API_ENDPOINT.AUTH.INDEX}/login`, data)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const registerAuth = async (data: TRegisterAuth) => {
  try {
    const res = await axios.post(`${API_ENDPOINT.AUTH.INDEX}/register`, data)
    return res.data
  } catch (error) {
    return error
  }
}

export const updateAuthMe = async (data: any) => {  
  try {
    const res = await instanceAxios.put(`${API_ENDPOINT.AUTH.INDEX}/update-info`, data)
    return res
  } catch (error) {
    return error
  }
}

export const getAuthMe = async () => {
  try {
    const res = await instanceAxios.get(API_ENDPOINT.AUTH.AUTH_ME)
    return res.data
  } catch (error) {
    return error
  }
}

export const changePasswordMe = async (data: TChangePassword) => {
  try {
    const res = await instanceAxios.patch(`${API_ENDPOINT.AUTH.INDEX}/change-password`, data)
    return res
  } catch (error) {
    return error
  }
}

export const changeAvatar = async (file: File) => {
  try {
    const formData = new FormData()
    console.log(file)
    formData.append('file', file)
    const res = await instanceAxios.post(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return res
  } catch (error) {
    return error
  }
}

export const loginAuthFacebook = async (idToken: string) => {
  const res = await axios.post(`${API_ENDPOINT.AUTH.INDEX}/login-facebook`, { idToken })
  return res.data
}

export const registerAuthFacebook = async (idToken: string) => {
  try {
    const res = await axios.post(`${API_ENDPOINT.AUTH.INDEX}/register-facebook`, { idToken })
    return res.data
  } catch (error) {
    return error
  }
}

export const loginAuthGoogle = async (idToken: string) => {
  const res = await axios.post(`${API_ENDPOINT.AUTH.INDEX}/login-google`, { idToken })
  return res.data
}

export const registerAuthGoogle = async (idToken: string) => {
    const res = await axios.post(`${API_ENDPOINT.AUTH.INDEX}/register-google`, { idToken })
    return res.data
}

export const forgotPasswordAuth = async (data: TForgotPasswordAuth) => {
  try {
    const res = await axios.post(`${API_ENDPOINT.AUTH.INDEX}/forgot-password`, data)
    return res.data
  } catch (error) {
    return error
  }
}
export const resetPasswordAuth = async (data: TResetPasswordAuth) => {
  try {
    const res = await axios.post(`${API_ENDPOINT.AUTH.INDEX}/reset-password`, data)
    return res.data
  } catch (error) {
    return error
  }
}