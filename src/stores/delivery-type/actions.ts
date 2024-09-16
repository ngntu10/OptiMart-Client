import { createAsyncThunk } from '@reduxjs/toolkit'

// ** services
import {
  createDeliveryType,
  deleteMultipleDeliveryType,
  deleteDeliveryType,
  getAllDeliveryTypes,
  updateDeliveryType
} from 'src/services/delivery-type'

// ** Types
import {
  TParamsCreateDeliveryType,
  TParamsDeleteMultipleDeliveryType,
  TParamsEditDeliveryType,
  TParamsGetDeliveryTypes
} from 'src/types/delivery-type'

export const serviceName = 'delivery-type'

export const getAllDeliveryTypesAsync = createAsyncThunk(
  `${serviceName}/get-all`,
  async (data: { params: TParamsGetDeliveryTypes }) => {
    const response = await getAllDeliveryTypes(data)

    return response
  }
)

export const createDeliveryTypeAsync = createAsyncThunk(
  `${serviceName}/create`,
  async (data: TParamsCreateDeliveryType) => {
    const response = await createDeliveryType(data)

    return response
  }
)

export const updateDeliveryTypeAsync = createAsyncThunk(
  `${serviceName}/update`,
  async (data: TParamsEditDeliveryType) => {
    const response = await updateDeliveryType(data)

    return response
  }
)

export const deleteDeliveryTypeAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
  const response = await deleteDeliveryType(id)

  return response
})

export const deleteMultipleDeliveryTypeAsync = createAsyncThunk(
  `${serviceName}/delete-multiple`,
  async (data: TParamsDeleteMultipleDeliveryType) => {
    const response = await deleteMultipleDeliveryType(data)

    return response
  }
)