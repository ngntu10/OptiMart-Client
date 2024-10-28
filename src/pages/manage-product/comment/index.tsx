
// ** Import Next
import { NextPage } from 'next'
// ** Config
import { PERMISSIONS } from 'src/configs/permission'
// ** views
import CommentListPage from 'src/views/pages/manage-product/comment/CommentList'
type TProps = {}
const Index: NextPage<TProps> = () => {
  return <CommentListPage />
}
export default Index