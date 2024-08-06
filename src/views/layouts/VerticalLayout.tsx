/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React
import * as React from 'react'

// ** Next
import { NextPage } from 'next'

// ** Mui
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import { mainListItems, secondaryListItems } from './listitem'
import { Divider, Drawer } from '@mui/material'
import { List } from '@mui/material'

const drawerWidth: number = 240

type TProps = {
  open: boolean
  toggleDrawer: () => void
}


const VerticalLayout: NextPage<TProps> = ({ open, toggleDrawer }) => {
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
          <IconButton onClick={toggleDrawer}>{/* <ChevronLeftIcon /> */}</IconButton>
        </Toolbar>
        <Divider />
        <List component='nav'>
          {mainListItems}
          <Divider sx={{ my: 1 }} />
          {secondaryListItems}
        </List>
      </Drawer>
  )
}

export default VerticalLayout
