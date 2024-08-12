/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { NextPage } from 'next'
import LoginPage from 'src/views/pages/login/index'
import BlankLayout from 'src/views/layouts/BlankLayout'
import { ReactNode } from 'react'

type Tprops = {}

const Login: NextPage<Tprops> = () => {
  

  return (
        <LoginPage />
  )
}

export default Login

Login.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
Login.guestGuard = true