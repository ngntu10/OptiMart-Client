// ** Import Next
import { NextPage } from 'next'

// ** React
import { ReactNode } from 'react'

// ** views
import NotAppLayout from 'src/views/layouts/NotAppLayout'
import ChangePasswordPage from 'src/views/pages/change-password'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return <ChangePasswordPage />
}

export default Index

Index.getLayout = (page: ReactNode) => <NotAppLayout>{page}</NotAppLayout>
