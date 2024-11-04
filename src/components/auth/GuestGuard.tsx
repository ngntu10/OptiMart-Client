/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'
import { useSession } from 'next-auth/react'

// ** Hooks
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'

// ** Config
import { ACCESS_TOKEN, USER_DATA } from 'src/configs/auth'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  // ** Props
  const { children, fallback } = props

  // ** Auth
  const authContext = useAuth()

  // ** router
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    if (window.localStorage.getItem(ACCESS_TOKEN) && window.localStorage.getItem(USER_DATA)) {
      router.replace('/')
    }
  }, [router.route])

  if (authContext.loading || (!authContext.loading && authContext.user !== null)) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
