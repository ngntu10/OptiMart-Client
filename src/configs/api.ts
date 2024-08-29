// const BASE_URL = process.env.NEXT_PUBLIC_APP_API_URL
export const BASE_URL = 'http://localhost:8081/api/v1'
export const API_ENDPOINT = {
  AUTH: {
    INDEX: `${BASE_URL}/auth`,
    AUTH_ME: `${BASE_URL}/auth/me`
  },
  ROLE: {
    INDEX: `${BASE_URL}/roles`
  }
}
