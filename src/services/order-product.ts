// ** Products
import { TParamsCreateOrderProduct } from 'src/types/order-product'
// api endPoint
import { API_ENDPOINT } from 'src/configs/api'
// Axios
import instanceAxios from 'src/helpers/axios'
import axios from 'axios'
// export const getAllProducts = async (data: { params: TParamsGetProducts }) => {
//   try {
//     const res = await instanceAxios.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}`, data)
//     return res.data
//   } catch (error) {
//     return error
//   }
// }
export const createOrderProduct = async (data: TParamsCreateOrderProduct) => {
  try {
    const res = await instanceAxios.post(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}`, data)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}
// export const updateOrderProduct = async (data: TParamsEditProduct) => {
//   const { id, ...rests } = data
//   try {
//     const res = await instanceAxios.put(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/${id}`, rests)
//     return res.data
//   } catch (error: any) {
//     return error?.response?.data
//   }
// }
// export const deleteOrderProduct = async (id: string) => {
//   try {
//     const res = await instanceAxios.delete(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/${id}`)
//     return res.data
//   } catch (error: any) {
//     return error?.response?.data
//   }
// }
// export const getDetailsProduct = async (id: string) => {
//   try {
//     const res = await instanceAxios.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/${id}`)
//     return res.data
//   } catch (error: any) {
//     return error?.response?.data
//   }
// }
// export const getDetailsProductPublic = async (id: string) => {
//   try {
//     const res = await axios.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/public/${id}`)
//     return res.data
//   } catch (error: any) {
//     return error?.response?.data
//   }
// }
// export const getDetailsProductPublicBySlug = async (slug: string) => {
//   try {
//     const data = { params: { isPublic: true } }
//     const res = await instanceAxios.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/public/slug/${slug}`, data)
//     return res.data
//   } catch (error: any) {
//     return error?.response?.data
//   }
// }
// export const getListRelatedProductBySlug = async (data: { params: TParamsGetRelatedProduct }) => {
//   try {
//     const res = await axios.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/related`, data)
//     return res.data
//   } catch (error: any) {
//     return error?.response?.data
//   }
// }
// export const deleteMultipleProduct = async (data: TParamsDeleteMultipleProduct) => {
//   try {
//     const res = await instanceAxios.delete(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/delete-many`, { data })
//     if (res?.data?.status === 'Success') {
//       return {
//         data: []
//       }
//     }
//     return {
//       data: null
//     }
//   } catch (error: any) {
//     return error?.response?.data
//   }
// }
// export const likeProduct = async (data: { productId: string }) => {
//   try {
//     const res = await instanceAxios.post(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/like`, data)
//     if (res?.data?.status === 'Success') {
//       return {
//         data: { _id: 1 }
//       }
//     }
//     return {
//       data: null
//     }
//   } catch (error: any) {
//     return error?.response?.data
//   }
// }
// export const unLikeProduct = async (data: { productId: string }) => {
//   try {
//     const res = await instanceAxios.post(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/unlike`, data)
//     if (res?.data?.status === 'Success') {
//       return {
//         data: { _id: 1 }
//       }
//     }
//     return {
//       data: null
//     }
//   } catch (error: any) {
//     return error?.response?.data
//   }
// }
// export const getAllProductsLiked = async (data: { params: TParamsGetProducts }) => {
//   try {
//     const res = await instanceAxios.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/liked/me`, data)
//     return res.data
//   } catch (error) {
//     return error
//   }
// }
// export const getAllProductsViewed = async (data: { params: TParamsGetProducts }) => {
//   try {
//     const res = await instanceAxios.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/viewed/me`, data)
//     return res.data
//   } catch (error) {
//     return error
//   }
// }