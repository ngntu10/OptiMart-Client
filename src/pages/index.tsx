/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Head from 'next/head'
import { ReactNode } from 'react'
import NotAppLayout from 'src/views/layouts/NotAppLayout'

export default function Home() {
  return (
    <>
      <Head>
        <title>OptiMart</title>
        <meta name='OptiMart' content='OptiMart' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </>
  )
}

Home.getLayout = (page: ReactNode) => <NotAppLayout>{page}</NotAppLayout>

Home.guestGuard = false
Home.authGuard = false
