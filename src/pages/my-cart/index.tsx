// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'

// ** views
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import MyCartPage from 'src/views/pages/my-cart'

type TProps = {}
const Index: NextPage<TProps> = () => {
  return <MyCartPage />
}
export default Index
Index.getLayout = (page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>