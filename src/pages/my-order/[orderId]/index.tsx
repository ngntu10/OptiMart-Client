
// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
// ** views
import NotAppLayout from 'src/views/layouts/NotAppLayout'
import MyOrderDetailsPage from 'src/views/pages/my-order/DetailOrder'
type TProps = {}
const Index: NextPage<TProps> = () => {
  return <MyOrderDetailsPage />
}
export default Index
Index.getLayout = (page: ReactNode) => <NotAppLayout>{page}</NotAppLayout>