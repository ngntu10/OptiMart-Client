import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
import { TParamsGetNotification } from 'src/types/notification'
export const getAllNotification = async (data: { params: TParamsGetNotification }) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.NOTIFICATION.INDEX}`, data)
    return res.data
  } catch (error) {
    return error
  }
}
export const markReadNotification = async (id: string) => {
  try {
    const res = await instanceAxios.post(`${API_ENDPOINT.NOTIFICATION.INDEX}/${id}/read`)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}
export const deleteNotification = async (id: string) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.NOTIFICATION.INDEX}/${id}`)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}
export const markAllReadNotification = async () => {
  try {
    const res = await instanceAxios.post(`${API_ENDPOINT.NOTIFICATION.INDEX}/all/read`)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}
