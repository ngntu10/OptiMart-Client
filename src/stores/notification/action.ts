import { createAsyncThunk } from '@reduxjs/toolkit'
// ** services
import {
  deleteNotification,
  getAllNotification,
  markAllReadNotification,
  markReadNotification
} from 'src/services/notification'
// ** Types
import { TParamsGetNotification } from 'src/types/notification'
export const serviceName = 'notification'
export const getAllNotificationsAsync = createAsyncThunk(
  `${serviceName}/get-all`,
  async (data: { params: TParamsGetNotification }) => {
    const response = await getAllNotification(data)
    return response
  }
)
export const deleteNotificationAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
  const response = await deleteNotification(id)
  return response
})
export const markReadNotificationAsync = createAsyncThunk(`${serviceName}/read`, async (id: string) => {
  const response = await markReadNotification(id)
  return response
})
export const markReadAllNotificationAsync = createAsyncThunk(`${serviceName}/read-all`, async () => {
  const response = await markAllReadNotification()
  return response
})
