/* eslint-disable @typescript-eslint/no-unused-vars */
// ** Next Imports
import { useRouter } from 'next/router'

// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Config
import auth, { ACCESS_TOKEN, USER_DATA } from 'src/configs/auth'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// Helpers
import { clearLocalUserData } from 'src/helpers/storage'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  // ** Props
  const { children, fallback } = props

  // ** Auth
  const authContext = useAuth()

  // ** router
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    if (
      authContext.user === null &&
      !window.localStorage.getItem(ACCESS_TOKEN) &&
      !window.localStorage.getItem(USER_DATA)
    ) {
      if (router.asPath !== '/') {
        router.replace({
          pathname: '/login',
          query: { returnUrl: router.asPath }
        })
      } else {
        router.replace('/login')
      }
      authContext.setUser(null)
      clearLocalUserData()
    }
  }, [router.route])

  // if(authContext.loading || authContext.user === null) return fallback

  return <>{children}</>
}

export default AuthGuard
