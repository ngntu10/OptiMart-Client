import { createAsyncThunk } from '@reduxjs/toolkit'

// ** services
import {
  createProductType,
  deleteMultipleProductType,
  deleteProductType,
  getAllProductTypes,
  updateProductType
} from 'src/services/product-type'

// ** Types
import {
    TParamsCreateProductType,
    TParamsDeleteMultipleProductType,
    TParamsEditProductType,
    TParamsGetProductTypes
  } from 'src/types/product-type'

export const serviceName = 'product-type'

export const getAllProductTypesAsync = createAsyncThunk(
  `${serviceName}/get-all`,
  async (data: { params: TParamsGetProductTypes }) => {
    const response = await getAllProductTypes(data)

    return response
  }
)

export const createProductTypeAsync = createAsyncThunk(
  `${serviceName}/create`,
  async (data: TParamsCreateProductType) => {
    const response = await createProductType(data)

    return response
  }
)

export const updateProductTypeAsync = createAsyncThunk(
  `${serviceName}/update`,
  async (data: TParamsEditProductType) => {
    const response = await updateProductType(data)

    return response
  }
)

export const deleteProductTypeAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
  const response = await deleteProductType(id)

  return response
})

export const deleteMultipleProductTypeAsync = createAsyncThunk(
  `${serviceName}/delete-multiple`,
  async (data: TParamsDeleteMultipleProductType) => {
    const response = await deleteMultipleProductType(data)

    return response
  }
)