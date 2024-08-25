import { IconButton, Tooltip, useTheme } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Icon from 'src/components/Icon'

interface TGridCreate {
  onClick: () => void
  disabled?: boolean
}

const GridCreate = (props: TGridCreate) => {
  // Props
  const { onClick, disabled } = props

  // Theme
  const theme = useTheme()

  // Translation
  const { t } = useTranslation()

  return (
    <Tooltip title={t('Create')}>
      <IconButton
        onClick={onClick}
        disabled={disabled}
        sx={{ backgroundColor: `${theme.palette.primary.main} !important`, color: `${theme.palette.common.white}` }}
      >
        <Icon icon='ic:round-plus' />
      </IconButton>
    </Tooltip>
  )
}

export default GridCreate
