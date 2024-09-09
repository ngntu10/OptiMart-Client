// ** Import Next
import { NextPage } from 'next'

// ** Config
import { PERMISSIONS } from 'src/configs/permission'

// ** Page
import UserListPage from 'src/views/pages/system/user/UserList'

// ** views

type TProps = {}
const Index: NextPage<TProps> = () => {
  return <UserListPage />
}

Index.permission = [PERMISSIONS.SYSTEM.USER.VIEW]
export default Index