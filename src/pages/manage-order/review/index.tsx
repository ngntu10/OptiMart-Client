// ** Import Next
import { NextPage } from 'next'

// ** Config
import { PERMISSIONS } from 'src/configs/permission'
// ** views
import ReviewListPage from 'src/views/pages/manage-order/reviews/ReviewList'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return <ReviewListPage />
}

Index.permission = [PERMISSIONS.MANAGE_ORDER.REVIEW.VIEW]
export default Index
