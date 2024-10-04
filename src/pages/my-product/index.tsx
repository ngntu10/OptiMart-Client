// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
import NotAppLayout from 'src/views/layouts/NotAppLayout'
import MyProductPage from 'src/views/pages/my-product'
// ** views

type TProps = {}
const Index: NextPage<TProps> = () => {
  return <MyProductPage />
}
export default Index
Index.getLayout = (page: ReactNode) => <NotAppLayout>{page}</NotAppLayout>
