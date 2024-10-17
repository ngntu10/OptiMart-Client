// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import auth from 'src/stores/auth'
import role from './role'
import user from './user'
import city from 'src/stores/city'
import deliveryType from 'src/stores/delivery-type'
import paymentType from 'src/stores/payment-type'
import productType from 'src/stores/product-type'
import product from 'src/stores/product'
import orderProduct from 'src/stores/order-product'
import reviews from 'src/stores/reviews'

export const store = configureStore({
  reducer: {
    user,
    auth,
    role,
    city,
    deliveryType,
    paymentType,
    productType,
    product,
    orderProduct, 
    reviews,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
