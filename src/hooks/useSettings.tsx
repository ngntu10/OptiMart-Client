import { useContext } from 'react'
import { SettingsContext, SettingsContextValue } from 'src/contexts/SettingsContext'

export const useSettings = (): SettingsContextValue => useContext(SettingsContext)
