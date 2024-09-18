// ** Import Next
import { NextPage } from 'next'

// ** Pages
import ProductTypeListPage from 'src/views/pages/manage-product/product-type/ProductTypeList'

// ** Config
import { PERMISSIONS } from 'src/configs/permission'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return <ProductTypeListPage />
}

Index.permission = [PERMISSIONS.MANAGE_PRODUCT.PRODUCT_TYPE.VIEW]
export default Index
