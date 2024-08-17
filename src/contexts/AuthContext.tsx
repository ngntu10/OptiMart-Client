/* eslint-disable @typescript-eslint/no-unused-expressions */

/* eslint-disable lines-around-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Config
import { ACCESS_TOKEN } from 'src/configs/auth'
import { CONFIG_API } from 'src/configs/api'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'

// ** services
import { loginAuth } from 'src/services/auth'

// ** helper
import { clearLocalUserData, setLocalUserData } from 'src/helpers/storage'
import instanceAxios from 'src/helpers/axios'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const cleanUserData = (data: any): UserDataType => {
  return {
    id: data.id,
    role: data.role,
    email: data.email,
    fullName: data.fullName,
    username: data.username,
    password: data.password,
    avatar: data.avatar || null
  }
}



const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  const { t} = useTranslation()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(ACCESS_TOKEN)
      if (storedToken) {
        setLoading(true)
        await instanceAxios
          .get(CONFIG_API.AUTH.AUTH_ME, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          })
          .then(async response => {
            setLoading(false)
            console.log(response)
            const user = cleanUserData(response.data)
            setUser(user)
          })
          .catch(e => {
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

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    loginAuth({ email: params.email, password: params.password })
      .then(async response => {
        setLoading(false)
        const user = cleanUserData(response.data.user)
        // params.rememberMe ?
        setLocalUserData(JSON.stringify(user), response.data.access_token, response.data.refresh_token)
        // : setLocalUserData(JSON.stringify(user))
        toast.success(t("Login_success"));
        const returnUrl = router.query.returnUrl
        setUser(user)
        const redirectURL = returnUrl && returnUrl != '/' ? returnUrl : '/'
        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    clearLocalUserData()
    router.push('/login')
    toast.success('Logout success')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
