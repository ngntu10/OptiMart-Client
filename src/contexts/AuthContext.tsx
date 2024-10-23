/* eslint-disable @typescript-eslint/no-unused-expressions */

/* eslint-disable lines-around-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Config
import { ACCESS_TOKEN } from 'src/configs/auth'
import authConfig, { LIST_PAGE_PUBLIC } from 'src/configs/auth'

// ** Config
import { API_ENDPOINT } from 'src/configs/api'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType, LoginGoogleParams } from './types'

// ** services
import { loginAuth, loginAuthGoogle } from 'src/services/auth'

// ** helper
import { clearLocalUserData, setLocalUserData, setTemporaryToken } from 'src/helpers/storage'
import instanceAxios from 'src/helpers/axios'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/stores'
import { updateProductToCart } from 'src/stores/order-product'
import { signOut } from 'next-auth/react'
import { ROUTE_CONFIG } from 'src/configs/route'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  loginGoogle: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

// const cleanUserData = (data: any): UserDataType => {
//   return {
//     id: data.id,
//     role: data.role,
//     email: data.email,
//     fullName: data.fullName,
//     firstName: data.firstName,
//     lastName: data.lastName,
//     middleName: data.middleName,
//     username: data.userName,
//     imageUrl: data.imageUrl,
//     likedProducts: [],
//     city: data.city.name,
//     phoneNumber: data.phoneNumber,
//     address: data.address,
//     addresses:data.addresses
//   }
// }


const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  
  // ** Hooks
  const router = useRouter()
  
  const { t } = useTranslation()
  
  // ** Redux
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(ACCESS_TOKEN)
      if (storedToken) {
        setLoading(true)
        await instanceAxios
        .get(API_ENDPOINT.AUTH.AUTH_ME, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        })
        .then(async response => {
          setLoading(false)
          const user = response.data
          setUser(user)
        })
        .catch((e) => {
          clearLocalUserData()
          setUser(null)
          setLoading(false)
          if (!router.pathname.includes('login')) {
            router.replace('/login')
          }
        })
      } else {
        setLoading(false)
      }
    }
    
    initAuth()
  }, [])
  
  const handleLoginGoogle = (params: LoginGoogleParams, errorCallback?: ErrCallbackType) => {
    loginAuthGoogle(params?.idToken)
      .then(async (response:any) => {
        if (params.rememberMe) {
          setLocalUserData(JSON.stringify(response.data.user), response.data.access_token, response.data.refresh_token)
        } else {
          setTemporaryToken(response.data.access_token)
        }
        toast.success(t('Login_success'))
        const returnUrl = router.query.returnUrl
        setUser({ ...response.data.user })
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL as string)
      })
      .catch((err:any) => {
        if (errorCallback) errorCallback(err)
      })
  }
  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    loginAuth({ email: params.email, password: params.password })
      .then(async response => {
        if (response.data) {
          const user = response.data.user
          if (params.rememberMe) {
            setLocalUserData(
              JSON.stringify(response.data.user),
              response.data.access_token,
              response.data.refresh_token
            )
          } else {
            setTemporaryToken(response.data.access_token)
          }
          toast.success(t('Login_success'))
          const returnUrl = router.query.returnUrl
          setUser(user)
          const redirectURL = returnUrl && returnUrl != '/' ? returnUrl : '/'
          router.replace(redirectURL as string)
        } else toast.error(response.message)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    clearLocalUserData()
    if (!LIST_PAGE_PUBLIC?.some(item => router.asPath?.startsWith(item))) {
      if (router.asPath !== '/') {
        router.replace({
          pathname: ROUTE_CONFIG.LOGIN,
          query: { returnUrl: router.asPath }
        })
      } else {
        router.replace(ROUTE_CONFIG.LOGIN)
      }
    }
    dispatch(
      updateProductToCart({
        orderItems: []
      })
    )
    toast.success(t('Logout_success'))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    loginGoogle: handleLoginGoogle
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
