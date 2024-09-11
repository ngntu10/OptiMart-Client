import { createAsyncThunk } from '@reduxjs/toolkit'

// ** services
import { createUser, deleteUser, getAllUsers, updateUser, deleteMultipleUser } from 'src/services/user'

// ** Types
import { TParamsCreateUser, TParamsEditUser, TParamsGetUsers, TParamsDeleteMultipleUser } from 'src/types/user'

export const serviceName = 'user'

export const getAllUsersAsync = createAsyncThunk(
  `${serviceName}/get-all`,
  async (data: { params: TParamsGetUsers }) => {
    const response = await getAllUsers(data)

    return response
  }
)

export const createUserAsync = createAsyncThunk(`${serviceName}/create`, async (data: TParamsCreateUser) => {
  const response = await createUser(data)

  return response
})

export const updateUserAsync = createAsyncThunk(`${serviceName}/update`, async (data: TParamsEditUser) => {
  const response = await updateUser(data)

  return response
})

export const deleteUserAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
  const response = await deleteUser(id)

  return response
})

export const deleteMultipleUserAsync = createAsyncThunk(
  `${serviceName}/delete-multiple`,
  async (data: TParamsDeleteMultipleUser) => {
    const response = await deleteMultipleUser(data)

    return response
  }
)
