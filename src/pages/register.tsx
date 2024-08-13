/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { NextPage } from 'next'
import { ReactNode } from 'react'

//** views
import BlankLayout from 'src/views/layouts/BlankLayout'
import RegisterPage from 'src/views/pages/register/register'

type Tprops = {}

const Register: NextPage<Tprops> = () => {
  return <RegisterPage />
}

export default Register

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true
