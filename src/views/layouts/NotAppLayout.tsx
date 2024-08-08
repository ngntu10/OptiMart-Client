/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React
import * as React from 'react'

// ** Next
import { NextPage } from 'next'

// ** Mui
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'

// ** Layouts
import HorizontalLayout from './HorizontalLayout'
import VerticalLayout from './VerticalLayout'

type TProps = {
  children: React.ReactNode
}

// TODO remove, this demo shouldn't need to reset the theme.

const NotAppLayout: NextPage<TProps> = ({ children }) => {

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* <VerticalLayout toggleDrawer={() => {}} open={open} /> */}
      <HorizontalLayout toggleDrawer={() => { }} open={false} isHideMenu={true} />
      <Box
        component='main'
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Toolbar />
        <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  )
}

export default NotAppLayout
