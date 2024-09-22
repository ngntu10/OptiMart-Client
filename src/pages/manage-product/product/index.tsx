// ** Import Next
import { NextPage } from 'next'
// ** Pages
import ProductListPage from 'src/views/pages/manage-product/product/productList'
// ** Config
import { PERMISSIONS } from 'src/configs/permission'
type TProps = {}
const Index: NextPage<TProps> = () => {
  return <ProductListPage />
}
Index.permission = [PERMISSIONS.MANAGE_PRODUCT.PRODUCT.VIEW]
export default Index
