
// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
// ** views
import PaymentVNPay from 'src/views/pages/payment/vnpay'
import NotAppLayout from 'src/views/layouts/NotAppLayout'
type TProps = {}
const Index: NextPage<TProps> = () => {
    return <PaymentVNPay />
}
export default Index
Index.getLayout = (page: ReactNode) => <NotAppLayout>{page}</NotAppLayout>