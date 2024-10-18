// ** Import Next
import { NextPage } from 'next'

// ** Config
import { PERMISSIONS } from 'src/configs/permission'

// ** Pages
import PaymentTypeListPage from 'src/views/pages/settings/payment-type/PaymentTypeList'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return <PaymentTypeListPage />
}

// Index.permission = [PERMISSIONS.SETTING.PAYMENT_TYPE.VIEW]
export default Index
