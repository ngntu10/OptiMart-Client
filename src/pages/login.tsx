/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Head from 'next/head'
import { NextPage } from 'next'
import CustomTextField from 'src/components/text-field'
import LoginPage from 'src/views/pages/login/login'

type Tprops = {}

const Login: NextPage<Tprops> = () => {
  

  return (
        <LoginPage />
  )
}

export default Login
