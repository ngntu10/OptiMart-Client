import { createAsyncThunk } from '@reduxjs/toolkit'

// ** Services
import {
  cancelOrderProductOfMe,
  createOrderProduct,
  deleteOrderProduct,
  getAllOrderProducts,
  getAllOrderProductsByMe,
  updateOrderProduct
} from 'src/services/order-product'
// ** Types
import { TParamsCreateOrderProduct, TParamsEditOrderProduct, TParamsGetOrderProducts } from 'src/types/order-product'

export const serviceName = 'orderProduct'
export const createOrderProductAsync = createAsyncThunk(
  `${serviceName}/create`,
  async (data: TParamsCreateOrderProduct) => {
    const response = await createOrderProduct(data)
    return response
  }
)

export const getAllOrderProductsByMeAsync = createAsyncThunk(
  `${serviceName}/get-all-by-me`,
  async (data: { params: TParamsGetOrderProducts }) => {
    const response = await getAllOrderProductsByMe(data)
    return response
  }
)

export const cancelOrderProductOfMeAsync = createAsyncThunk(`${serviceName}/cancel-order-of-my`, async (id: string) => {
  const response = await cancelOrderProductOfMe(id)
  return response
})

// cms
export const getAllOrderProductsAsync = createAsyncThunk(
  `${serviceName}/get-all`,
  async (data: { params: TParamsGetOrderProducts }) => {
    const response = await getAllOrderProducts(data)
    return response
  }
)
export const updateOrderProductAsync = createAsyncThunk(`${serviceName}/update`, async (data: TParamsEditOrderProduct) => {
  const response = await updateOrderProduct(data)
  return response
})
export const deleteOrderProductAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
  const response = await deleteOrderProduct(id)
  return response
})
