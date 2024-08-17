// ** React
import React, { useState } from 'react'

// ** Next
import { useTranslation } from 'react-i18next'

// ** Mui Imports

import IconButton from '@mui/material/IconButton'

// ** Components
import Icon from 'src/components/Icon'

// ** Hooks
import { Box, Menu, MenuItem } from '@mui/material'

// ** Third party
import ReactCountryFlag from 'react-country-flag'

// ** config
import { LANGUAGE_OPTIONS } from 'src/configs/i18n'

type TProps = {}

const countryCode = {
  en: 'GB',
  vi: 'VN'
}

const LanguageDropdown = (props: TProps) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  // ** Hooks
  const { i18n } = useTranslation()
  const open = Boolean(anchorEl)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOnchangeLang = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <Box>
      <IconButton
        onClick={handleOpen}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          borderRadius: '50%'
        }}
      >
        <ReactCountryFlag
          style={{ height: '26px', width: '26px', borderRadius: '50%', objectFit: 'cover' }}
          className='country-flag flag-icon'
          countryCode={(countryCode as any)[i18n.language]}
          svg
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id='language-dropdown'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {LANGUAGE_OPTIONS.map(lang => {
          return (
            <MenuItem
              key={lang.value}
              selected={i18n.language === lang.value}
              onClick={() => {
                handleClose()
                handleOnchangeLang(lang.value)
              }}
              sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <ReactCountryFlag
                className='country-flag flag-icon'
                countryCode={(countryCode as any)[lang.value]}
                svg
                style={{ position: 'relative', top: '0px' }}
              />
              {lang.lang}
            </MenuItem>
          )
        })}
      </Menu>
    </Box>
  )
}

export default LanguageDropdown
