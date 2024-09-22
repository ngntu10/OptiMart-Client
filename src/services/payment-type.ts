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

    return res
  } catch (error) {
    return error
  }
}

export const createPaymentType = async (data: TParamsCreatePaymentType) => {
  try {
    const res = await instanceAxios.post(`${API_ENDPOINT.SETTING.PAYMENT_TYPE.INDEX}`, data)

    return res
  } catch (error: any) {
    return error?.response?.data
  }
}

export const updatePaymentType = async (data: TParamsEditPaymentType) => {
  const { id, ...rests } = data
  try {
    console.log(data);
    const res = await instanceAxios.put(`${API_ENDPOINT.SETTING.PAYMENT_TYPE.INDEX}/${id}`, rests)

    return res
  } catch (error: any) {
    return error?.response?.data
  }
}

export const deletePaymentType = async (id: string) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.SETTING.PAYMENT_TYPE.INDEX}/${id}`)

    return res
  } catch (error: any) {
    return error?.response?.data
  }
}

export const getDetailsPaymentType = async (id: string) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.SETTING.PAYMENT_TYPE.INDEX}/${id}`)

    return res
  } catch (error: any) {
    return error?.response?.data
  }
}

export const deleteMultiplePaymentType = async (data: TParamsDeleteMultiplePaymentType) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.SETTING.PAYMENT_TYPE.INDEX}/delete-many`, { data })
    return res
  } catch (error: any) {
    return error?.response?.data
  }
}
