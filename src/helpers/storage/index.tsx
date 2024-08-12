import { ACCESS_TOKEN, REFRESH_TOKEN, USER_DATA } from 'src/configs/auth'

export const setLocalUserData = (userData: string, accessToken: string, refreshToken: string) => {
  return {
    userData: window.localStorage.setItem(USER_DATA, userData),
    accessToken: window.localStorage.setItem(ACCESS_TOKEN, accessToken),
    refreshToken: window.localStorage.setItem(REFRESH_TOKEN, refreshToken)
  }
}

export const getLocalUserData = () => {
  return {
    userData: window.localStorage.getItem(USER_DATA),
    accessToken: window.localStorage.getItem(ACCESS_TOKEN),
    refreshToken: window.localStorage.getItem(REFRESH_TOKEN)
  }
}

export const clearLocalUserData = () => {
    window.localStorage.removeItem(USER_DATA),
    window.localStorage.removeItem(ACCESS_TOKEN),
    window.localStorage.removeItem(REFRESH_TOKEN)
}
