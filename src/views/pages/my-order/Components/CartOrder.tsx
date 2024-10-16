// ** Next
import { NextPage } from 'next'

// ** React
import { Fragment, useEffect, useMemo, useState } from 'react'

// ** Mui
import { Avatar, Box, Button, Checkbox, Divider, Typography, useTheme } from '@mui/material'

// ** Translate
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'

// ** Utils
import { convertUpdateMultipleProductsCart, convertUpdateProductToCart, formatNumberToLocal, isExpiry } from 'src/utils'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Other
import { TItemOrderProduct, TItemOrderProductMe, TItemProductMe } from 'src/types/order-product'
import { useRouter } from 'next/router'
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'
import { cancelOrderProductOfMeAsync } from 'src/stores/order-product/actions'
import ConfirmationDialog from 'src/components/confirmation-dialog'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
import { STATUS_ORDER_PRODUCT } from 'src/configs/orderProduct'
import Icon from 'src/components/Icon'
import { getLocalProductCart, setLocalProductToCart } from 'src/helpers/storage'
import { TProduct } from 'src/types/product'
import { updateProductToCart } from 'src/stores/order-product'
import { ROUTE_CONFIG } from 'src/configs/route'

type TProps = {
  dataOrder: any
}
const CardOrder: NextPage<TProps> = props => {
  // ** Props
  const { dataOrder } = props

  // State
  const [openCancel, setOpenCancel] = useState(false)

  // ** theme
  const theme = useTheme()
  // ** redux
  const dispatch: AppDispatch = useDispatch()
  const { isSuccessCancelMe, orderItems } = useSelector((state: RootState) => state.orderProduct)

  // ** Hooks
  const router = useRouter()
  const { user } = useAuth()

  const handleConfirmCancel = () => {
    dispatch(cancelOrderProductOfMeAsync(dataOrder.id))
  }
  // ** handle
  const handleCloseDialog = () => {
    setOpenCancel(false)
  }
  useEffect(() => {
    if (isSuccessCancelMe) {
      handleCloseDialog()
    } 
  }, [isSuccessCancelMe])

  const handleUpdateProductToCart = (items: TItemOrderProduct[]) => {
    const productCart = getLocalProductCart()
    const parseData = productCart ? JSON.parse(productCart) : {}
    const listOrderItems = convertUpdateMultipleProductsCart(orderItems, items)

    if (user) {
      dispatch(
        updateProductToCart({
          orderItems: listOrderItems
        })
      )
      setLocalProductToCart({ ...parseData, [user?.id]: listOrderItems })
    }
  }
  const handleBuyAgain = () => {
    handleUpdateProductToCart(
      dataOrder.orderItemList.map((item: any) => ({
        name: item.name,
        amount: item.amount,
        image: item.image,
        price: item.price,
        discount: item.discount,
        id: item?.id,
        slug: item?.slug,
      }))
    )
    console.log(dataOrder);
    router.push(
      {
        pathname: ROUTE_CONFIG.MY_CART,
        query: {
          selected: dataOrder?.orderItemList?.map((item: any) => {
            return item?.id
          })
        }
      },
      ROUTE_CONFIG.MY_CART
    )
  }

  const memeDisabledBuyAgain = useMemo(() => {
    return dataOrder?.orderItems?.some((item: any) => !item.product.countInStock)
  }, [dataOrder.orderItems])

  return (
    <>
      {/* {loading || (isLoading && <Spinner />)} */}
      <ConfirmationDialog
        open={openCancel}
        handleClose={handleCloseDialog}
        handleCancel={handleCloseDialog}
        handleConfirm={handleConfirmCancel}
        title={t('Title_cancel_order')}
        description={t('Confirm_cancel_order')}
      />
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: '40px',
          width: '100%',
          borderRadius: '15px'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 2 }}>
          {dataOrder.status === 2 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Icon icon='carbon:delivery'></Icon>
              <Typography>
                <span style={{ color: theme.palette.success.main }}>{t('Order_has_been_delivery')}</span>
                <span>{' | '}</span>
              </Typography>
            </Box>
          )}
          <Typography sx={{ textTransform: 'uppercase', color: theme.palette.primary.main, fontWeight: 600 }}>
            {t(`${(STATUS_ORDER_PRODUCT as any)[dataOrder.status]?.label}`)}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {dataOrder?.orderItemList?.map((item: any) => {
            return (
              <Box key={item?.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
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
          {[0, 1].includes(dataOrder.orderStatus) && (
            <Button
              variant='outlined'
              onClick={() => setOpenCancel(true)}
              sx={{
                height: 40,
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                color: '#da251d !important',
                backgroundColor: 'transparent !important',
                border: '1px solid #da251d !important'
              }}
            >
              {t('Cancel_order')}
            </Button>
          )}
          <Button
            variant='contained'
            onClick={handleBuyAgain}
            sx={{
              height: 40,
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              fontWeight: 'bold'
            }}
            disabled={memeDisabledBuyAgain}
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
