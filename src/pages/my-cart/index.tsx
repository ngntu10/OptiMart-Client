// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'

// ** views
import NotAppLayout from 'src/views/layouts/NotAppLayout'
import MyCartPage from 'src/views/pages/my-cart'


type TProps = {}
const Index: NextPage<TProps> = () => {
  return <MyCartPage />
}
export default Index
Index.getLayout = (page: ReactNode) => <NotAppLayout>{page}</NotAppLayout>