// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
import NotAppLayout from 'src/views/layouts/NotAppLayout'
import CheckoutProductPage from 'src/views/pages/checkout-product'
// ** views
type TProps = {}
const Index: NextPage<TProps> = () => {
  return <CheckoutProductPage />
}
export default Index
Index.getLayout = (page: ReactNode) => <NotAppLayout>{page}</NotAppLayout>