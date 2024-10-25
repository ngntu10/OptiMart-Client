// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
// ** views
import NotAppLayout from 'src/views/layouts/NotAppLayout'
import ForgotPasswordPage from 'src/views/pages/forgot-password'
type TProps = {}
const ForgotPassword: NextPage<TProps> = () => {
  return <ForgotPasswordPage />
}
export default ForgotPassword
ForgotPassword.getLayout = (page: ReactNode) => <NotAppLayout>{page}</NotAppLayout>
ForgotPassword.guestGuard = true