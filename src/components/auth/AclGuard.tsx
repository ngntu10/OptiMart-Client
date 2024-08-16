/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { ReactNode } from 'react'

// ** Types
import { buildAbilityFor, type ACLObj, AppAbility } from 'src/configs/acl'
import BlankLayout from 'src/views/layouts/BlankLayout'
import NotAuthorized from 'src/pages/401'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import { AbilityContext } from 'src/components/acl/Can'

interface AclGuardProps {
  children: ReactNode
  authGuard?: boolean
  guestGuard?: boolean
  aclAbilities: ACLObj
} 

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props

  const auth = useAuth()
  const permissionUser = auth.user?.role?.permissions ?? []
  const router = useRouter()

  let ability: AppAbility

  if (auth.user && !ability) {
    ability = buildAbilityFor(permissionUser, aclAbilities.subject)
  }

  // if guest guard or no guard is tru or any error page
  if (guestGuard || router.route === '/500' || router.route === '/404' || !authGuard) {
    if (auth.user && ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else {
      return children
    }
  }

  // check the access off current user
  if (ability && auth.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard
