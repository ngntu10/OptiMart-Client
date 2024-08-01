import { useContext } from 'react'
import { AuthContext } from 'src/contexts/AuthContext'

export const useAuth = () => useContext(AuthContext)
