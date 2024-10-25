// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
import NotAppLayout from 'src/views/layouts/NotAppLayout'
// ** views
import ResetPasswordPage from 'src/views/pages/reset-password'
type TProps = {}
const ResetPassword: NextPage<TProps> = () => {
  return <ResetPasswordPage />
}
export default ResetPassword
ResetPassword.getLayout = (page: ReactNode) => <NotAppLayout>{page}</NotAppLayout>
ResetPassword.guestGuard = true