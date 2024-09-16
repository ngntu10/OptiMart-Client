import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
import { TParamsCreateUser, TParamsEditUser, TParamsGetUsers, TParamsDeleteMultipleUser } from 'src/types/user'

export const getAllUsers = async (data: { params: TParamsGetUsers }) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.SYSTEM.USER.INDEX}`, data)

    return res.data
  } catch (error) {
    return error
  }
}

export const createUser = async (data: TParamsCreateUser) => {
  try {
    const res = await instanceAxios.post(`${API_ENDPOINT.SYSTEM.USER.INDEX}`, data)

    return res
  } catch (error: any) {
    return error
  }
}

export const updateUser = async (data: TParamsEditUser) => {
  const { id, ...rests } = data
  try {
    const res = await instanceAxios.patch(`${API_ENDPOINT.SYSTEM.USER.INDEX}/${id}`, rests)

    return res
  } catch (error: any) {
    return error
  }
}

export const deleteUser = async (id: string) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.SYSTEM.USER.INDEX}/${id}`)

    return res
  } catch (error: any) {
    return error
  }
}

export const getDetailsUser = async (id: string) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.SYSTEM.USER.INDEX}/${id}`)

    return res
  } catch (error: any) {
    return error?.response?.data
  }
}

export const deleteMultipleUser = async (data: TParamsDeleteMultipleUser) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.SYSTEM.USER.INDEX}/delete-many`, { data })
    return res
  } catch (error: any) {
    return error?.response?.data
  }
}
