import { createAsyncThunk } from '@reduxjs/toolkit'

// ** Services
import { createOrderProduct } from 'src/services/order-product'
// ** Types
import { TParamsCreateOrderProduct } from 'src/types/order-product'

export const serviceName = 'orderProduct'
export const createOrderProductAsync = createAsyncThunk(
  `${serviceName}/create`,
  async (data: TParamsCreateOrderProduct) => {
    console.log(data);
    const response = await createOrderProduct(data)
    return response
  }
)
