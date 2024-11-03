import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
export const getCountUserType = async () => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.REPORT.INDEX}/user-type/count`)
    return res.data
  } catch (error) {
    return error
  }
}