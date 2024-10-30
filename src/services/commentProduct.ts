// ** Types
import {
  TParamsAddComment,
  TParamsDeleteMultipleComment,
  TParamsGetComments,
  TParamsUpdateComment,
  TParamsReplyComment,
} from 'src/types/comment'
// api endPoint
import { API_ENDPOINT } from 'src/configs/api'
// Axios
import instanceAxios from 'src/helpers/axios'

export const addComment = async (data: TParamsAddComment) => {
  try {
    const res = await instanceAxios.post(`${API_ENDPOINT.MANAGE_PRODUCT.COMMENT.INDEX}`, data)
    return res.data
  } catch (error) {
    return error
  }
}

export const updateMyComment = async (data: TParamsUpdateComment) => {
  try {
    const { id, ...rests } = data
    const res = await instanceAxios.put(`${API_ENDPOINT.MANAGE_PRODUCT.COMMENT.INDEX}/me/${id}`, rests)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}
export const deleteMyComment = async (id: string) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.MANAGE_PRODUCT.COMMENT.INDEX}/me/${id}`)
    return res.data
  } catch (error) {
    return error
  }
}
export const deleteComment = async (id: string) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.MANAGE_PRODUCT.COMMENT.INDEX}/${id}`)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}
export const getAllComments = async (data: { params: TParamsGetComments }) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.MANAGE_PRODUCT.COMMENT.INDEX}`, data)
    return res.data
  } catch (error) {
    return error
  }
}
export const getDetailsComment = async (id: string) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.MANAGE_PRODUCT.COMMENT.INDEX}/${id}`)
    return res.data
  } catch (error) {
    return error
  }
}
export const updateComment = async (data: TParamsUpdateComment) => {
  const { id, ...rests } = data
  try {
    const res = await instanceAxios.put(`${API_ENDPOINT.MANAGE_PRODUCT.COMMENT.INDEX}/${id}`, rests)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}
export const deleteMultipleComment = async (data: TParamsDeleteMultipleComment) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.MANAGE_PRODUCT.COMMENT.INDEX}/delete-many`, { data })
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const getAllCommentsPublic = async (data: { params: TParamsGetComments }) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.MANAGE_PRODUCT.COMMENT.INDEX}/public`, data)
    return res.data
  } catch (error) {
    return error
  }
}

export const replyComment = async (data: TParamsReplyComment) => {
  try {
    const res = await instanceAxios.post(`${API_ENDPOINT.MANAGE_PRODUCT.COMMENT.INDEX}/reply`, data)
    return res.data
  } catch (error) {
    return error
  }
}