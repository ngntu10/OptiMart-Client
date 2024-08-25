// ** libraries
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
// ** config
import { BASE_URL, API_ENDPOINT } from 'src/configs/api'
// ** helper
import {
  clearLocalUserData,
  clearTemporaryToken,
  getLocalUserData,
  getTemporaryToken,
  setLocalUserData,
  setTemporaryToken
} from 'src/helpers/storage'
// ** Next
import { NextRouter, useRouter } from 'next/router'
// ** React
import { FC } from 'react'
// types
import { UserDataType } from 'src/contexts/types'
// ** hooks
import { useAuth } from 'src/hooks/useAuth'
import { useTranslation } from 'react-i18next'
type TAxiosInterceptor = {
  children: React.ReactNode
}
const instanceAxios = axios.create({ baseURL: BASE_URL })
const handleRedirectLogin = (router: NextRouter, setUser: (data: UserDataType | null) => void) => {
  if (router.asPath !== '/') {
    router.replace({
      pathname: '/login',
      query: { returnUrl: router.asPath }
    })
  } else {
    router.replace('/login')
  }
  setUser(null)
  clearLocalUserData()
  clearTemporaryToken()
}

const AxiosInterceptor: FC<TAxiosInterceptor> = ({ children }) => {
  const router = useRouter()
  const { setUser, user } = useAuth()
  const { i18n } = useTranslation()

  instanceAxios.interceptors.request.use(async config => {
    const lang = i18n.language
    if (lang) {
      config.headers['Accept-Language'] = lang
    }
    const { accessToken, refreshToken } = getLocalUserData()
    const { temporaryToken } = getTemporaryToken()

    if (accessToken || temporaryToken) {
      let decodedAccessToken: any = {}
      if (accessToken) {
        decodedAccessToken = jwtDecode(accessToken)
      } else if (temporaryToken) {
        decodedAccessToken = jwtDecode(temporaryToken)
      }
      if (decodedAccessToken?.exp > Date.now() / 1000) {
        config.headers['Authorization'] = `Bearer ${accessToken ? accessToken : temporaryToken}`
      } else {
        if (refreshToken) {
          const decodedRefreshToken: any = jwtDecode(refreshToken)
          if (decodedRefreshToken?.exp > Date.now() / 1000) {
            await axios
              .post(
                `${API_ENDPOINT.AUTH.INDEX}/refreshtoken`,
                { refresh_token: refreshToken },
                {
                  headers: {
                    Authorization: `Bearer ${refreshToken}`
                  }
                }
              )
              .then(res => {
                console.log(res)
                const newAccessToken = res?.data.accessToken
                if (newAccessToken) {
                  config.headers['Authorization'] = `Bearer ${newAccessToken}`
                  if (accessToken) {
                    setLocalUserData(JSON.stringify(user), newAccessToken, refreshToken)
                  }
                } else {
                  handleRedirectLogin(router, setUser)
                }
              })
              .catch(e => {
                handleRedirectLogin(router, setUser)
              })
          } else {
            handleRedirectLogin(router, setUser)
          }
        } else {
          handleRedirectLogin(router, setUser)
        }
      }
    } else {
      handleRedirectLogin(router, setUser)
    }
    return config
  })
  instanceAxios.interceptors.response.use(response => {
    return response
  })
  return <>{children}</>
}
export default instanceAxios
export { AxiosInterceptor }
