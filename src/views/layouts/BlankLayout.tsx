/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React
import * as React from 'react'

// ** Next
import { NextPage } from 'next'
import { Box, BoxProps, styled } from '@mui/material'
import { height } from '@mui/system'

type TProps = {
  children: React.ReactNode
}

const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh'
}))

const BlankLayout: NextPage<TProps> = ({ children }) => {
  return (
    <BlankLayoutWrapper>
      <Box sx={{ overflow: 'hidden', minHeight: '100vh' }}>{children}</Box>
    </BlankLayoutWrapper>
  )
}

export default BlankLayout
