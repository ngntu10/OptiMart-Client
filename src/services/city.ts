import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
import { TParamsCreateCity, TParamsDeleteMultipleCity, TParamsEditCity, TParamsGetCities } from 'src/types/city'

export const getAllCities = async (data: { params: TParamsGetCities }) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.CITY.INDEX}`, data)

    return res.data
  } catch (error) {
    return error
  }
}

export const createCity = async (data: TParamsCreateCity) => {
  try {
    const res = await instanceAxios.post(`${API_ENDPOINT.CITY.INDEX}`, data)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const updateCity = async (data: TParamsEditCity) => {
  const { id, ...rests } = data
  try {
    const res = await instanceAxios.put(`${API_ENDPOINT.CITY.INDEX}/${id}`, rests)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const deleteCity = async (id: string) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.CITY.INDEX}/${id}`)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const getDetailsCity = async (id: string) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.CITY.INDEX}/${id}`)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const deleteMultipleCity = async (data: TParamsDeleteMultipleCity) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.CITY.INDEX}/delete-many`, { data })
    if (res?.data?.status === 'Success') {
      return {
        data: []
      }
    }

    return {
      data: null
    }
  } catch (error: any) {
    return error?.response?.data
  }
}
