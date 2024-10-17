import { createAsyncThunk } from '@reduxjs/toolkit'
// ** Services
import {
  addReview,
  deleteMultipleReview,
  deleteMyReview,
  deleteReview,
  getAllReviews,
  updateMyReview,
  updateReview
} from 'src/services/reviewProduct'
// ** Types
import {
    TParamsAddReview,
    TParamsDeleteMultipleReview,
    TParamsGetReviews,
    TParamsUpdateReview
  } from 'src/types/reviews'
export const serviceName = 'review'
export const createReviewAsync = createAsyncThunk(`${serviceName}/create`, async (data: TParamsAddReview) => {
  const response = await addReview(data)
  return response
})
export const getAllReviewAsync = createAsyncThunk(
  `${serviceName}/get-all`,
  async (data: { params: TParamsGetReviews }) => {
    const response = await getAllReviews(data)
    return response
  }
)
export const updateReviewAsync = createAsyncThunk(`${serviceName}/update`, async (data: TParamsUpdateReview) => {
  const response = await updateReview(data)
  return response
})
export const deleteReviewAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
  const response = await deleteReview(id)
  return response
})
export const deleteMyReviewAsync = createAsyncThunk(`${serviceName}/delete-my-review`, async (id: string) => {
  const response = await deleteMyReview(id)
  return response
})
export const updateMyReviewAsync = createAsyncThunk(
  `${serviceName}/update-my-review`,
  async (data: TParamsUpdateReview) => {
    const response = await updateMyReview(data)
    return response
  }
)
export const deleteMultipleReviewAsync = createAsyncThunk(
  `${serviceName}/delete-multiple`,
  async (ids: TParamsDeleteMultipleReview) => {
    const response = await deleteMultipleReview(ids)
    return response
  }
)
