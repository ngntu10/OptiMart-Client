// ** Import Next
import { NextPage } from 'next'
// ** Configs
import { PERMISSIONS } from 'src/configs/permission'
import OrderProductListPage from '../order-product/OrderProductList'

// ** views

type TProps = {}

const Index: NextPage<TProps> = () => {
  return <OrderProductListPage />
}

Index.permission = [PERMISSIONS.MANAGE_ORDER.ORDER.VIEW]
export default Index