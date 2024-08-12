// const BASE_URL = process.env.NEXT_PUBLIC_APP_API_URL
const BASE_URL = 'http://localhost:8080/api/v1'
export const CONFIG_API = {
  AUTH: {
    INDEX: `${BASE_URL}/auth`,
    AUTH_ME: `${BASE_URL}/auth/me`
  }
}
