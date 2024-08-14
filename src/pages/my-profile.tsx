// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
import NotAppLayout from 'src/views/layouts/NotAppLayout'
import MyProfilePage from 'src/views/pages/my-profile'

// ** views


type TProps = {}

const Index: NextPage<TProps> = () => {
  return <MyProfilePage />
}

export default Index
Index.getLayout = (page: ReactNode) => <NotAppLayout>{page}</NotAppLayout>
