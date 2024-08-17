/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Hooks
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'

// ** Config
import { ACCESS_TOKEN, USER_DATA } from 'src/configs/auth'

interface NoGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const NoGuard = (props: NoGuardProps) => {
  // ** Props
  const { children, fallback } = props

  // ** Auth
  const authContext = useAuth()


  if (authContext.loading) {
    return fallback
  }

  return <>{children}</>
}

export default NoGuard
