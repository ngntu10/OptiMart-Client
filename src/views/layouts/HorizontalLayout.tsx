/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React
import * as React from 'react'

// ** Next
import { NextPage } from 'next'
import Link from 'next/link'

// ** Mui
import { styled } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// ** components
import UserDropDown from './components/user-dropdown'
import ModeToggle from './components/modeToggle'
import Icon from 'src/components/Icon'
import LanguageDropdown from 'src/views/layouts/components/language-dropdown'
import CartProduct from 'src/views/layouts/components/cart-product'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

// config
import { ROUTE_CONFIG } from 'src/configs/route'

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

type TProps = {
  open: boolean
  isHideMenu?: boolean
  toggleDrawer: () => void
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor:
    theme.palette.mode === 'light' ? theme.palette.customColors.lightPaperBg : theme.palette.customColors.darkPaperBg,
  color: theme.palette.text.primary,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const HorizontalLayout: NextPage<TProps> = ({ open, toggleDrawer, isHideMenu }) => {
  const { user } = useAuth()
  const router = useRouter()

  const handleNavigateLogin = () => {
    if (router.asPath !== '/') {
      router.replace({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      })
    } else {
      router.replace('/login')
    }
  }

  return (
    <AppBar position='absolute' open={open}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
          margin: '0 20px'
        }}
      >
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' })
          }}
        >
          {!isHideMenu && <Icon icon='ic:round-menu'></Icon>}
        </IconButton>
        <Typography
          component='h1'
          variant='h6'  
          color='primary'
          noWrap
          sx={{ flexGrow: 1, fontWeight: '600', cursor: 'pointer' }}
        >
          <Link style={{ color: 'inherit' }} href={ROUTE_CONFIG.HOME}>
            OPTIMART
          </Link>
        </Typography>
        <LanguageDropdown />
        <ModeToggle />
        <CartProduct />
        {user ? (
          <UserDropDown />
        ) : (
          <Button variant='contained' sx={{ ml: 2, width: 'auto' }} onClick={handleNavigateLogin}>
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default HorizontalLayout
