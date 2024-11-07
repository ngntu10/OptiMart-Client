// ** Products
import { TParamsCreateOrderProduct, TParamsEditOrderProduct, TParamsGetOrderProducts, TParamsStatusOrderUpdate } from 'src/types/order-product'
// api endPoint
import { API_ENDPOINT } from 'src/configs/api'
// Axios
import instanceAxios from 'src/helpers/axios'
import axios from 'axios'
export const getAllOrderProductsByMe = async (data: { params: TParamsGetOrderProducts }) => {
  const res = await instanceAxios.get(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/me`, data)

  return res.data
}
export const createOrderProduct = async (data: TParamsCreateOrderProduct) => {
  const res = await instanceAxios.post(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}`, data)
  return res
}
export const getDetailsOrderProductByMe = async (id: string) => {
  const res = await instanceAxios.get(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/me/${id}`)
  return res.data
}

export const cancelOrderProductOfMe = async (id: string) => {
  const res = await instanceAxios.post(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/me/cancel/${id}`)
  return res.data
}

// admin cms
export const deleteOrderProduct = async (id: string) => {
  const res = await instanceAxios.delete(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/${id}`)
  return res.data
}
export const getDetailsOrderProduct = async (id: string) => {
  const res = await instanceAxios.get(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/${id}`)
  return res.data
}
export const getAllOrderProducts = async (data: { params: TParamsGetOrderProducts }) => {
  const res = await instanceAxios.get(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}`, data)
  return res.data
}
export const updateOrderProduct = async (data: TParamsEditOrderProduct) => {
  const { id, ...rests } = data
  const res = await instanceAxios.put(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/${id}`, rests)
  return res.data
}
export const updateStatusOrderProduct = async (data: TParamsStatusOrderUpdate) => {
    const res = await instanceAxios.post(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/status/${data.id}`, data)
    return res.data

}
