/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Head from 'next/head'
import { ReactNode } from 'react'
import NotAppLayout from 'src/views/layouts/NotAppLayout'

// ** Pages
import HomePage from 'src/views/pages/home'

export default function Home() {
  return (
    <>
      <Head>
        <title>OptiMart</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HomePage />
    </>
  )
}

Home.getLayout = (page: ReactNode) => <NotAppLayout>{page}</NotAppLayout>

Home.guestGuard = false
Home.authGuard = false
