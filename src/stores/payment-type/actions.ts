import { createAsyncThunk } from '@reduxjs/toolkit'

// ** services
import {
  createPaymentType,
  deleteMultiplePaymentType,
  deletePaymentType,
  getAllPaymentTypes,
  updatePaymentType
} from 'src/services/payment-type'

// ** Types
import {
    TParamsCreatePaymentType,
    TParamsDeleteMultiplePaymentType,
    TParamsEditPaymentType,
    TParamsGetPaymentTypes
  } from 'src/types/payment-type'

export const serviceName = 'payment-type'

export const getAllPaymentTypesAsync = createAsyncThunk(
  `${serviceName}/get-all`,
  async (data: { params: TParamsGetPaymentTypes }) => {
    const response = await getAllPaymentTypes(data)

    return response
  }
)

export const createPaymentTypeAsync = createAsyncThunk(
  `${serviceName}/create`,
  async (data: TParamsCreatePaymentType) => {
    const response = await createPaymentType(data)

    return response
  }
)

export const updatePaymentTypeAsync = createAsyncThunk(
  `${serviceName}/update`,
  async (data: TParamsEditPaymentType) => {
    const response = await updatePaymentType(data)

    return response
  }
)

export const deletePaymentTypeAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
  const response = await deletePaymentType(id)

  return response
})

export const deleteMultiplePaymentTypeAsync = createAsyncThunk(
  `${serviceName}/delete-multiple`,
  async (data: TParamsDeleteMultiplePaymentType) => {
    const response = await deleteMultiplePaymentType(data)

    return response
  }
)
