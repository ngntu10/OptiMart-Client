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
type TProps = {
  dataOrder: TItemOrderProductMe
}
const CardOrder: NextPage<TProps> = props => {
  // ** Props
  const { dataOrder } = props
  console.log('dataOrder', { dataOrder })
  // State
  const [selectedRows, setSelectedRows] = useState<string[]>([])
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
  return (
    <>
      {/* {loading || (isLoading && <Spinner />)} */}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: '40px',
          width: '100%',
          borderRadius: '15px'
        }}
      >
        <Divider />
        <Box mt={2} mb={2} sx={{display: "flex", flexDirection: "column", gap: 4}}>
          {dataOrder?.orderItems?.map((item: TItemOrderProduct) => {
            return (
              <Box key={item.product} sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Box
                  sx={{
                    border: `1px solid rgba(${theme.palette.customColors.main}, 0.2)`
                  }}
                >
                  <Avatar
                    sx={{
                      width: '80px',
                      height: '80px'
                    }}
                    src={item.image}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: '18px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      display: 'block'
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                      variant='h6'
                      sx={{
                        color: item.discount > 0 ? theme.palette.error.main : theme.palette.primary.main,
                        textDecoration: item.discount > 0 ? 'line-through' : 'normal',
                        fontSize: '14px'
                      }}
                    >
                      {formatNumberToLocal(item.price)} VND
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {item.discount > 0 && (
                        <Typography
                          variant='h4'
                          sx={{
                            color: theme.palette.primary.main,
                            fontSize: '14px'
                          }}
                        >
                          {formatNumberToLocal((item.price * (100 - item.discount)) / 100)}
                        </Typography>
                      )}
                      {item.discount > 0 && (
                        <Box
                          sx={{
                            backgroundColor: hexToRGBA(theme.palette.error.main, 0.42),
                            width: '36px',
                            height: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '2px'
                          }}
                        >
                          <Typography
                            variant='h6'
                            sx={{
                              color: theme.palette.error.main,
                              fontSize: '10px',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            - {item.discount} %
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '14px'
                    }}
                  >
                    x {item.amount}
                  </Typography>
                </Box>
              </Box>
            )
          })}
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '2px', mt: 4 }}>
          <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>{t('Sum_money')}:</Typography>
          <Typography sx={{ fontSize: '18px', fontWeight: 600, color: theme.palette.primary.main }}>
            {formatNumberToLocal(dataOrder.totalPrice)} VND
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: 6, justifyContent: 'flex-end' }}>
          <Button
            variant='contained'
            sx={{
              height: 40,
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              fontWeight: 'bold'
            }}
          >
            {t('Buy_again')}
          </Button>
          <Button
            variant='outlined'
            sx={{
              height: 40,
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              fontWeight: 'bold'
            }}
          >
            {t('View_details')}
          </Button>
        </Box>
      </Box>
    </>
  )
}
export default CardOrder