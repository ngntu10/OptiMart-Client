
// ** React
import React from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import Icon from 'src/components/Icon'
import { IconButton, Tooltip } from '@mui/material'


interface TGridDelete {
  onClick: () => void
  disabled?: boolean
}

const GridDelete = (props: TGridDelete) => {
  const { t } = useTranslation()

  // Props
  const { onClick, disabled } = props

  return (
    <Tooltip title={t('Delete')}>
      <IconButton onClick={onClick} disabled={disabled}>
        <Icon icon='mdi:delete-outline' />
      </IconButton>
    </Tooltip>
  )
}

export default GridDelete