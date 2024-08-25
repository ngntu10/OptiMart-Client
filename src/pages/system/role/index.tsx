// ** Import Next
import { NextPage } from 'next'

// ** pages
import RoleListPage from 'src/views/pages/system/role/RoleList'

// ** views

type TProps = {}

const Index: NextPage<TProps> = () => {
  return <RoleListPage />
}

export default Index
