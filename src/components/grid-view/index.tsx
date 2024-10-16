// ** React
import React from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import Icon from 'src/components/Icon'
import { IconButton, Tooltip } from '@mui/material'

interface TGridView {
  onClick: () => void
  disabled?: boolean
}

const GridView = (props: TGridView) => {
  const { t } = useTranslation()

  // Props
  const { onClick, disabled } = props

  return (
    <Tooltip title={t('View')}>
      <IconButton onClick={onClick} disabled={disabled}>
      <Icon icon="material-symbols:visibility-outline"></Icon>
      </IconButton>
    </Tooltip>
  )
}

export default GridView
