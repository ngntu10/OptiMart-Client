/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-before-return */
// ** React
import { FC } from 'react'

// ** Next
import { NextRouter, useRouter } from 'next/router'

// ** lib
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

// ** helpers
import { clearLocalUserData, getLocalUserData } from '../storage'

// ** types
import { UserDataType } from 'src/contexts/types'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** configs
import { ACCESS_TOKEN } from 'src/configs/auth'
import { BASE_URL, CONFIG_API } from 'src/configs/api'

type TAxiosInterceptor = {
  children: React.ReactNode
}

const instanceAxios = axios.create({ baseURL: BASE_URL })

const handleRedirectlogin = (router: NextRouter, setUser: (data: UserDataType | null) => void) => {
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
}

const AxiosInterceptor: FC<TAxiosInterceptor> = ({ children }) => {
  const router = useRouter()
  const { accessToken, refreshToken } = getLocalUserData()
  const { setUser } = useAuth()

  instanceAxios.interceptors.request.use(async config => {
    if (accessToken) {
      const decodedAccessToken: any = jwtDecode(accessToken)
      if (decodedAccessToken.exp > Date.now() / 1000) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      } else {
        console.log('old', accessToken)
        if (refreshToken) {
          const decodedRefreshToken: any = jwtDecode(refreshToken)
          if (decodedRefreshToken?.exp > Date.now() / 1000) {
            try {
              const res = await axios.post(
                `${CONFIG_API.AUTH.INDEX}/refreshtoken`,
                { refresh_token: refreshToken },
                {
                  headers: {
                    Authorization: `Bearer ${refreshToken}`
                  }
                }
              )
              const newAccessToken = res.data.accessToken
              if (newAccessToken) {
                window.localStorage.setItem(ACCESS_TOKEN, newAccessToken)
                config.headers['Authorization'] = `Bearer ${newAccessToken}`
              } else {
                handleRedirectlogin(router, setUser)
              }
            } catch (e) {
              handleRedirectlogin(router, setUser)
            }
          } else {
            handleRedirectlogin(router, setUser)
          }
        } else {
          handleRedirectlogin(router, setUser)
        }
      }
    } else {
      handleRedirectlogin(router, setUser)
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
