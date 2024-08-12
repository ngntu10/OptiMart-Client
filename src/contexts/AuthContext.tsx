/* eslint-disable lines-around-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import { loginAuth, logoutAuth } from 'src/services/auth'
import { CONFIG_API } from 'src/configs/api'
import { error } from 'console'
import { clearLocalUserData, setLocalUserData } from 'src/helpers/storage'

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

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        console.log(storedToken)
        setLoading(true)
        await axios
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
        const user = cleanUserData(response.data.user)
        params.rememberMe
          ? setLocalUserData(JSON.stringify(user), response.data.access_token, response.data.refresh_token)
          : null
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
    logoutAuth().then(res => {
      setUser(null)
      clearLocalUserData()
      router.push('/login')
    })
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
