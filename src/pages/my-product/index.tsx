// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
// ** views
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import MyProductPage from 'src/views/pages/my-product'
type TProps = {}
const Index: NextPage<TProps> = () => {
  return <MyProductPage />
}
export default Index
Index.getLayout = (page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>
