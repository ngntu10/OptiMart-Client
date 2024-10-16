import { ACCESS_TOKEN, REFRESH_TOKEN, TEMPORARY_TOKEN, USER_DATA } from 'src/configs/auth'

import { LOCAL_PRODUCT_CART } from 'src/configs/product'
import { TItemOrderProduct } from 'src/types/order-product'

export const setLocalUserData = (userData: string, accessToken: string, refreshToken: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(USER_DATA, userData)
    window.localStorage.setItem(ACCESS_TOKEN, accessToken)
    window.localStorage.setItem(REFRESH_TOKEN, refreshToken)
  }
  return {
    userData: '',
    accessToken: '',
    refreshToken: ''
  }
}

export const getLocalUserData = () => {
  if (typeof window !== 'undefined') {
    return {
      userData: window.localStorage.getItem(USER_DATA),
      accessToken: window.localStorage.getItem(ACCESS_TOKEN),
      refreshToken: window.localStorage.getItem(REFRESH_TOKEN)
    }
  }
  return {
    userData: '',
    accessToken: '',
    refreshToken: ''
  }
}

export const clearLocalUserData = () => {
  if (typeof window !== 'undefined') {
    return {
      userData: window.localStorage.removeItem(USER_DATA),
      accessToken: window.localStorage.removeItem(ACCESS_TOKEN),
      refreshToken: window.localStorage.removeItem(REFRESH_TOKEN)
    }
  }
  return {
    userData: '',
    accessToken: '',
    refreshToken: ''
  }
}
export const setTemporaryToken = (accessToken: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(TEMPORARY_TOKEN, accessToken)
  }
}

export const getTemporaryToken = () => {
  if (typeof window !== 'undefined') {
    return {
      temporaryToken: window.localStorage.getItem(TEMPORARY_TOKEN)
    }
  }

  return {
    temporaryToken: ''
  }
}

export const clearTemporaryToken = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(TEMPORARY_TOKEN)
  }
}

export const setLocalProductToCart = (data: Record<string, TItemOrderProduct[]>) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(LOCAL_PRODUCT_CART, JSON.stringify(data))
  }
}
export const getLocalProductCart = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(LOCAL_PRODUCT_CART)
  }
  return ""
}