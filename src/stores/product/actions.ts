import { createAsyncThunk } from '@reduxjs/toolkit'
// ** services
import {
  changeProductImage,
  createProduct,
  deleteMultipleProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsLiked,
  getAllProductsViewed,
  likeProduct,
  unLikeProduct,
  updateProduct
} from 'src/services/product'
// ** Types
import {
  TParamsCreateProduct,
  TParamsDeleteMultipleProduct,
  TParamsEditProduct,
  TParamsGetProducts
} from 'src/types/product'
export const serviceName = 'product'
export const getAllProductsAsync = createAsyncThunk(
  `${serviceName}/get-all`,
  async (data: { params: TParamsGetProducts }) => {
    const response = await getAllProducts(data)
    return response
  }
)
export const createProductAsync = createAsyncThunk(`${serviceName}/create`, async (data: TParamsCreateProduct) => {
  const response = await createProduct(data)

  return response
})
export const updateProductAsync = createAsyncThunk(`${serviceName}/update`, async (data: TParamsEditProduct) => {
  const response = await updateProduct(data)

  return response
})
export const deleteProductAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
  const response = await deleteProduct(id)
  return response
})
export const deleteMultipleProductAsync = createAsyncThunk(
  `${serviceName}/delete-multiple`,
  async (data: TParamsDeleteMultipleProduct) => {
    const response = await deleteMultipleProduct(data)
    return response
  }
)

export const changeProductImageAsync = createAsyncThunk(
  `${serviceName}/changProductImage`,
  async (data: { file: File; idProduct: string }) => {
    const response: any = await changeProductImage(data)
    return response
  }
)

export const likeProductAsync = createAsyncThunk(`${serviceName}/like`, async (data: { productId: string }) => {
  const response = await likeProduct(data)
  return response
})
export const unLikeProductAsync = createAsyncThunk(`${serviceName}/unlike`, async (data: { productId: string }) => {
  const response = await unLikeProduct(data)
  return response
})
export const getAllProductsViewedAsync = createAsyncThunk(
  `${serviceName}/get-all-viewed`,
  async (data: { params: TParamsGetProducts }) => {
    const response = await getAllProductsViewed(data)
    return response
  }
)
export const getAllProductsLikedAsync = createAsyncThunk(
  `${serviceName}/get-all-liked`,
  async (data: { params: TParamsGetProducts }) => {
    const response = await getAllProductsLiked(data)
    return response
  }
)
