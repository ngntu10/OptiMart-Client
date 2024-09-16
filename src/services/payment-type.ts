import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
import {
  TParamsCreatePaymentType,
  TParamsDeleteMultiplePaymentType,
  TParamsEditPaymentType,
  TParamsGetPaymentTypes
} from 'src/types/payment-type'

export const getAllPaymentTypes = async (data: { params: TParamsGetPaymentTypes }) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.SETTING.PAYMENT_TYPE.INDEX}`, data)

    return res.data
  } catch (error) {
    return error
  }
}

export const createPaymentType = async (data: TParamsCreatePaymentType) => {
  try {
    const res = await instanceAxios.post(`${API_ENDPOINT.SETTING.PAYMENT_TYPE.INDEX}`, data)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const updatePaymentType = async (data: TParamsEditPaymentType) => {
  const { id, ...rests } = data
  try {
    const res = await instanceAxios.put(`${API_ENDPOINT.SETTING.PAYMENT_TYPE.INDEX}/${id}`, rests)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const deletePaymentType = async (id: string) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.SETTING.PAYMENT_TYPE.INDEX}/${id}`)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const getDetailsPaymentType = async (id: string) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.SETTING.PAYMENT_TYPE.INDEX}/${id}`)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const deleteMultiplePaymentType = async (data: TParamsDeleteMultiplePaymentType) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.SETTING.PAYMENT_TYPE.INDEX}/delete-many`, { data })
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
