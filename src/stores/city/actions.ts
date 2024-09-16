import { createAsyncThunk } from '@reduxjs/toolkit'

// ** services
import { createCity, deleteMultipleCity, deleteCity, getAllCities, updateCity } from 'src/services/city'
import { TParamsCreateCity, TParamsDeleteMultipleCity, TParamsEditCity, TParamsGetCities } from 'src/types/city'

// ** Types

export const serviceName = 'city'

export const getAllCitiesAsync = createAsyncThunk(
  `${serviceName}/get-all`,
  async (data: { params: TParamsGetCities }) => {
    const response = await getAllCities(data)

    return response
  }
)

export const createCityAsync = createAsyncThunk(`${serviceName}/create`, async (data: TParamsCreateCity) => {
  const response = await createCity(data)

  return response
})

export const updateCityAsync = createAsyncThunk(`${serviceName}/update`, async (data: TParamsEditCity) => {
  const response = await updateCity(data)

  return response
})

export const deleteCityAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
  const response = await deleteCity(id)

  return response
})

export const deleteMultipleCityAsync = createAsyncThunk(
  `${serviceName}/delete-multiple`,
  async (data: TParamsDeleteMultipleCity) => {
    const response = await deleteMultipleCity(data)

    return response
  }
)
