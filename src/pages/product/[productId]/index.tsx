// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
import NotAppLayout from 'src/views/layouts/NotAppLayout'
import DetailsProductPage from 'src/views/pages/product/DetailProduct'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return <DetailsProductPage />
}

export default Index

Index.guestGuard = false
Index.authGuard = false
Index.getLayout = (page: ReactNode) => <NotAppLayout>{page}</NotAppLayout>
