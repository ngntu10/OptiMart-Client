// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
import NotAppLayout from 'src/views/layouts/NotAppLayout'
// ** views
import MyOrderPage from 'src/views/pages/my-order'


type TProps = {}
const Index: NextPage<TProps> = () => {
  return <MyOrderPage />
}
export default Index
Index.getLayout = (page: ReactNode) => <NotAppLayout>{page}</NotAppLayout>