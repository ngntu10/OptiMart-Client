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
import { useTheme } from '@mui/material'

type TProps = {
  children: React.ReactNode
}

// TODO remove, this demo shouldn't need to reset the theme.

const NotAppLayout: NextPage<TProps> = ({ children }) => {
  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <HorizontalLayout toggleDrawer={() => {}} open={false} isHideMenu={true} />
      <Box
        component='main'
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          // width: '100vw',
          overflow: 'auto'
        }}
      >
        <Toolbar />
        <Container
          sx={{
            m: 4,
            width: 'calc(100vw - 50px)',
            maxWidth: 'unset !important',
            overflow: 'auto',
            maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight} - 32px)`,
            padding: '0 !important',
            borderRadius: '15px'
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  )
}

export default NotAppLayout
