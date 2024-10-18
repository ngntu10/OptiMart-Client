// ** Import Next
import { NextPage } from 'next'

// ** Config
import { PERMISSIONS } from 'src/configs/permission'

// ** Pages
import DeliveryTypeListPage from 'src/views/pages/settings/delivery-type/DeliveryTypeList'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return <DeliveryTypeListPage />
}

// Index.permission = [PERMISSIONS.SETTING.DELIVERY_TYPE.VIEW]
export default Index
