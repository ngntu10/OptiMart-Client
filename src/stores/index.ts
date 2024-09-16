// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import auth from 'src/stores/auth'
import role from './role'
import user from './user'
import city from 'src/stores/city'
import deliveryType from 'src/stores/delivery-type'

export const store = configureStore({
  reducer: {
    user,
    auth,
    role,
    city,
    deliveryType
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
