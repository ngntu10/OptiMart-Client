import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
import {
  TParamsCreateDeliveryType,
  TParamsDeleteMultipleDeliveryType,
  TParamsEditDeliveryType,
  TParamsGetDeliveryTypes
} from 'src/types/delivery-type'

export const getAllDeliveryTypes = async (data: { params: TParamsGetDeliveryTypes }) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.SETTING.DELIVERY_TYPE.INDEX}`, data)

    return res.data
  } catch (error) {
    return error
  }
}

export const createDeliveryType = async (data: TParamsCreateDeliveryType) => {
  try {
    const res = await instanceAxios.post(`${API_ENDPOINT.SETTING.DELIVERY_TYPE.INDEX}`, data)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const updateDeliveryType = async (data: TParamsEditDeliveryType) => {
  const { id, ...rests } = data
  try {
    const res = await instanceAxios.put(`${API_ENDPOINT.SETTING.DELIVERY_TYPE.INDEX}/${id}`, rests)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const deleteDeliveryType = async (id: string) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.SETTING.DELIVERY_TYPE.INDEX}/${id}`)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const getDetailsDeliveryType = async (id: string) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.SETTING.DELIVERY_TYPE.INDEX}/${id}`)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const deleteMultipleDeliveryType = async (data: TParamsDeleteMultipleDeliveryType) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.SETTING.DELIVERY_TYPE.INDEX}/delete-many`, { data })
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
