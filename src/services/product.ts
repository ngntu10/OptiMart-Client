// ** Products
import {
  TParamsGetProducts,
  TParamsCreateProduct,
  TParamsEditProduct,
  TParamsDeleteMultipleProduct
} from 'src/types/product'
// api endPoint
import { API_ENDPOINT } from 'src/configs/api'
// Axios
import instanceAxios from 'src/helpers/axios'
export const getAllProducts = async (data: { params: TParamsGetProducts }) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}`, data)
    return res.data
  } catch (error) {
    return error
  }
}
export const createProduct = async (data: TParamsCreateProduct) => {
  try {
    const res = await instanceAxios.post(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}`, data)
    return res
  } catch (error: any) {
    return error?.response?.data
  }
}
export const updateProduct = async (data: TParamsEditProduct) => {
  const { id, ...rests } = data
  try {
    const res = await instanceAxios.put(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/${id}`, rests)
    return res
  } catch (error: any) {
    return error?.response?.data
  }
}
export const deleteProduct = async (id: string) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/${id}`)
    return res
  } catch (error: any) {
    return error?.response?.data
  }
}
export const getDetailsProduct = async (id: string) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/${id}`)
    return res
  } catch (error: any) {
    return error?.response?.data
  }
}
export const deleteMultipleProduct = async (data: TParamsDeleteMultipleProduct) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/delete-many`, { data })
    return res
  } catch (error: any) {
    return error?.response?.data
  }
}

export const changeProductImage = async (data: { file: File; idProduct: string }) => {
  try {
    const formData = new FormData()
    formData.append('file', data.file)
    formData.append('productId', data.idProduct)
    const res = await instanceAxios.post(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return res
  } catch (error) {
    return error
  }
}

export const getAllProductsPublic = async (data: { params: TParamsGetProducts }) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/public`, data)
    return res
  } catch (error) {
    return error
  }
}

export const getDetailsProductPublic = async (id: string) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/public/${id}`)
    return res
  } catch (error: any) {
    return error?.response?.data
  }
}



