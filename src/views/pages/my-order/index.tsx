// ** Next
import { NextPage } from 'next'
// ** React
import { Fragment, useEffect, useMemo, useState } from 'react'
// ** Mui
import { Avatar, Box, Button, Checkbox, Divider, IconButton, Tooltip, Typography, useTheme } from '@mui/material'
// ** Components
import CustomTextField from 'src/components/text-field'
import Icon from 'src/components/Icon'
import CustomSelect from 'src/components/custom-select'
// ** Translate
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'
// ** Utils
import { cloneDeep, convertUpdateProductToCart, formatNumberToLocal } from 'src/utils'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
// ** Redux
import { updateProductToCart } from 'src/stores/order-product'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
// ** Other
import { TItemOrderProduct, TItemOrderProductMe } from 'src/types/order-product'
import { getLocalProductCart, setLocalProductToCart } from 'src/helpers/storage'
import NoData from 'src/components/no-data'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'
import { getAllOrderProductsByMeAsync } from 'src/stores/order-product/actions'
import CardOrder from './Components/CartOrder'
type TProps = {}
const MyOrderPage: NextPage<TProps> = () => {
  // State
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])
  const [page, setPage] = useState(1)
  // ** Hooks
  const { i18n } = useTranslation()
  const { user } = useAuth()
  const router = useRouter()
  // ** theme
  const theme = useTheme()
  // ** redux
  const dispatch: AppDispatch = useDispatch()
  const { ordersOfMe } = useSelector((state: RootState) => state.orderProduct)
  // ** fetch API
  const handleGetListOrdersOfMe = () => {
    const query = {
      params: { limit: pageSize, page: page }
    }
    dispatch(getAllOrderProductsByMeAsync(query))
  }
  // ** Handle
  useEffect(() => {
    handleGetListOrdersOfMe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize])
  return (
    <>
      {/* {loading || (isLoading && <Spinner />)} */}
      <Box>
        {ordersOfMe?.data?.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '20px' }}>
            {ordersOfMe?.data.map((item: TItemOrderProductMe, index: number) => {
              return <CardOrder dataOrder={item} key={item.id} />
            })}
          </Box>
        ) : (
          <Box sx={{ padding: '20px', width: '200px' }}>
            <NoData widthImage='80px' heightImage='80px' textNodata={t('No_product')} />
          </Box>
        )}
      </Box>
    </>
  )
}
export default MyOrderPage