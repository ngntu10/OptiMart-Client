/* eslint-disable lines-around-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React
import * as React from 'react'

// ** Next
import { NextPage } from 'next'

// ** Mui
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import { Divider, styled } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'

// ** Components
import IconifyIcon from 'src/components/Icon'
import ListVerticalLayout from './ListVerticalLayout'

const drawerWidth: number = 240

type TProps = {
  open: boolean
  toggleDrawer: () => void
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(18),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(18)
      }
    })
  }
}))

const VerticalLayout: NextPage<TProps> = ({ open, toggleDrawer }) => {
  const [openState, setOpenState] = React.useState(true)

  const handleClick = () => {
    setOpenState(!openState)
  }

  return (
    <Drawer variant='permanent' open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1]
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <IconifyIcon icon='mingcute:left-line' />
        </IconButton>
      </Toolbar>
      <Divider />
      <ListVerticalLayout open={open} />
    </Drawer>
  )
}

export default VerticalLayout
