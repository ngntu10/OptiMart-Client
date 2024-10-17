// ** Types
import {
  TParamsAddReview,
  TParamsDeleteMultipleReview,
  TParamsGetReviews,
  TParamsUpdateReview
} from 'src/types/reviews'
// api endPoint
import { API_ENDPOINT } from 'src/configs/api'
// Axios
import instanceAxios from 'src/helpers/axios'
export const addReview = async (data: TParamsAddReview) => {
  const res = await instanceAxios.post(`${API_ENDPOINT.MANAGE_ORDER.REVIEW.INDEX}`, data)
  return res.data
}

export const updateMyReview = async (data: TParamsUpdateReview) => {
  const { id, ...rests } = data
  const res = await instanceAxios.put(`${API_ENDPOINT.MANAGE_ORDER.REVIEW.INDEX}/me/${id}`, rests)
  return res.data
}

export const getDetailsReview = async (id: string) => {
  const res = await instanceAxios.get(`${API_ENDPOINT.MANAGE_ORDER.REVIEW.INDEX}/${id}`)
  return res.data
}

export const deleteMyReview = async (id: string) => {
  const res = await instanceAxios.delete(`${API_ENDPOINT.MANAGE_ORDER.REVIEW.INDEX}/me/${id}`)
  return res.data
}

export const deleteReview = async (id: string) => {
  const res = await instanceAxios.delete(`${API_ENDPOINT.MANAGE_ORDER.REVIEW.INDEX}/${id}`)
  return res.data
}

export const getAllReviews = async (data: { params: TParamsGetReviews }) => {
  const res = await instanceAxios.get(`${API_ENDPOINT.MANAGE_ORDER.REVIEW.INDEX}`, data)
  return res.data
}

export const updateReview = async (data: TParamsUpdateReview) => {
  const { id, ...rests } = data
  const res = await instanceAxios.put(`${API_ENDPOINT.MANAGE_ORDER.REVIEW.INDEX}/${id}`, rests)
  return res.data
}

export const deleteMultipleReview = async (data: TParamsDeleteMultipleReview) => {
  const res = await instanceAxios.delete(`${API_ENDPOINT.MANAGE_ORDER.REVIEW.INDEX}/delete-many`, { data })
  return res.data
}
