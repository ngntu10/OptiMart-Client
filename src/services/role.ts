import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
import { TParamsCreateRole, TParamsDeleteRole, TParamsEditRole, TParamsGetRoles } from 'src/types/role'

export const getAllRoles = async (data: { params: TParamsGetRoles }) => {
  const res = await instanceAxios.get(`${API_ENDPOINT.SYSTEM.ROLE.INDEX}`, data)
  return res
}

export const createRole = async (data: TParamsCreateRole) => {
  const res = await instanceAxios.post(`${API_ENDPOINT.SYSTEM.ROLE.INDEX}`, data)
  return res
}

export const updateRole = async (data: TParamsEditRole) => {
  const { id, ...rests } = data
  const res = await instanceAxios.put(`${API_ENDPOINT.SYSTEM.ROLE.INDEX}/${id}`, rests)
  return res
}

export const deleteRole = async (id: string) => {
  const res = await instanceAxios.delete(`${API_ENDPOINT.SYSTEM.ROLE.INDEX}/${id}`)
  return res
}

export const getDetailsRole = async (id: string) => {
  const res = await instanceAxios.get(`${API_ENDPOINT.SYSTEM.ROLE.INDEX}/${id}`)
  return res
}
