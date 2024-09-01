/* eslint-disable newline-before-return */
import axios from 'axios'

// ** Config
import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'

// ** Types
import { TLoginAuth, TRegisterAuth, TChangePassword } from 'src/types/auth'

export const loginAuth = async (data: TLoginAuth) => {
  const res = await axios.post(`${API_ENDPOINT.AUTH.INDEX}/login`, data)
  return res.data
}

export const registerAuth = async (data: TRegisterAuth) => {
  try {
    const res = await axios.post(`${API_ENDPOINT.AUTH.INDEX}/register`, data)
    console.log(res)
    return res.data
  } catch (error) {
    return error
  }
}

export const updateAuthMe = async (data: any) => {
  console.log(data)
  try {
    const res = await instanceAxios.patch(`${API_ENDPOINT.AUTH.INDEX}/update-info`, data)
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
    const res = await instanceAxios.post(`${API_ENDPOINT.AUTH.CHANGE_AVATAR}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return res
  } catch (error) {
    return error
  }
}
