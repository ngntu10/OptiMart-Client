/* eslint-disable lines-around-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */

// ** React
import React, { useEffect } from 'react'

//** Next
import { useRouter } from 'next/router'

// ** Mui
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { Badge, Typography, styled } from '@mui/material'

//** Components
import Icon from 'src/components/Icon'

//**  Hooks
import { useAuth } from 'src/hooks/useAuth'
import { useTranslation } from 'react-i18next'
import { ROUTE_CONFIG } from 'src/configs/route'

// ** Redux
import { useSelector } from 'react-redux'
import { RootState } from 'src/stores'

// ** Utils
import { toFullName } from 'src/utils'
import Image from 'next/image'

type TProps = {}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}))

const UserDropDown = (props: TProps) => {
  // ** Translation
  const { t, i18n } = useTranslation()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const { user, logout, setUser } = useAuth()
  console.log(user)

  // ** Redux
  const { userData } = useSelector((state: RootState) => state.auth)
  const permissionUser = user?.role?.permissions ?? []

  const open = Boolean(anchorEl)
  const router = useRouter()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNavigateMyProfile = () => {
    router.push(ROUTE_CONFIG.MY_PROFILE)
    handleClose()
  }

  const handleNavigateChangePassword = () => {
    router.push(ROUTE_CONFIG.CHANGE_PASSWORD)
    handleClose()
  }

  const handleNavigateManageSystem = () => {
    router.push(ROUTE_CONFIG.DASHBOARD)
    handleClose()
  }

  useEffect(() => {
    if (userData) {
      setUser({ ...userData })
    }
  }, [userData])

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={t('Account')}>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot'>
              <Avatar sx={{ width: 32, height: 32 }}>
                {user?.imageUrl ? (
                  <Image
                    src={user?.imageUrl}
                    alt='avatar'
                    width={0}
                    height={0}
                    style={{
                      height: '32px',
                      width: '32px',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <Icon icon='ph:user-thin' />
                )}
              </Avatar>
            </StyledBadge>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mx: 2, pb: 2, px: 2 }}>
          <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot'>
            <Avatar sx={{ width: 32, height: 32 }}>
              {user?.imageUrl ? (
                <Image
                  src={user?.imageUrl || ''}
                  alt='avatar'
                  width={0}
                  height={0}
                  style={{
                    height: '32px',
                    width: '32px',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <Icon icon='ph:user-thin' />
              )}
            </Avatar>
          </StyledBadge>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component='span'>
              {/* {toFullName(user?.lastName || '', user?.middleName || '', user?.firstName || '', i18n.language)} */}
            </Typography>
            <Typography component='span'>{user?.role?.name}</Typography>
          </Box>
        </Box>
        <Divider />
        {1 > 0 && (
          <MenuItem onClick={handleNavigateManageSystem}>
            <Avatar>
              <Icon icon='arcticons:phone-manager' />
            </Avatar>{' '}
            {t('Manage_system')}
          </MenuItem>
        )}

        <MenuItem onClick={handleNavigateMyProfile}>
          <Avatar>
            <Icon icon='ph:user-thin' />
          </Avatar>{' '}
          {t('My_profile')}
        </MenuItem>
        <MenuItem onClick={handleNavigateChangePassword}>
          <Avatar sx={{ backgroundColor: 'transparent' }}>
            <Icon icon='arcticons:password' />
          </Avatar>
          {t('Change_password')}
        </MenuItem>
        <MenuItem onClick={logout}>
          <Avatar sx={{ backgroundColor: 'transparent' }}>
            <Icon icon='material-symbols-light:logout' />
          </Avatar>
          {t('Logout')}
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default UserDropDown
