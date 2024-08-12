/* eslint-disable lines-around-comment */
export default {
  // meEndpoint: '/auth/me',
  // loginEndpoint: '/jwt/login',
  // registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}

export const ACCESS_TOKEN = "accessToken"
export const REFRESH_TOKEN = "refreshToken"
export const USER_DATA = "userData"
