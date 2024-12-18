// ** Next
import { NextPage } from 'next'
import { useRouter } from 'next/router'

// ** React
import { useEffect, useMemo, useState } from 'react'

// ** Mui
import { Avatar, Box, Button, Divider, Tabs, TabsProps, Typography, styled, useTheme } from '@mui/material'

// ** Components
import NoData from 'src/components/no-data'
import CustomPagination from 'src/components/custom-pagination'
import Spinner from 'src/components/spinner'
import Icon from 'src/components/Icon'
// ** Translate
import { useTranslation } from 'react-i18next'

// ** Redux
import { cancelOrderProductOfMeAsync, getAllOrderProductsByMeAsync } from 'src/stores/order-product/actions'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { resetInitialState, updateProductToCart } from 'src/stores/order-product'
import { resetInitialState as resetInitialReview } from 'src/stores/reviews'

// ** Other
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'
import toast from 'react-hot-toast'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
import { convertUpdateMultipleProductsCart, formatNumberToLocal } from 'src/utils'

// ** Services
import { getDetailsOrderProductByMe } from 'src/services/order-product'

// ** Types
import { TItemOrderProduct, TItemOrderProductMe, TItemProductMe } from 'src/types/order-product'
import { useAuth } from 'src/hooks/useAuth'
import ConfirmationDialog from 'src/components/confirmation-dialog'
import { getLocalProductCart, setLocalProductToCart } from 'src/helpers/storage'

// ** Config
import { ROUTE_CONFIG } from 'src/configs/route'
import { STATUS_ORDER_PRODUCT } from 'src/configs/orderProduct'
import ModalWriteReview from 'src/views/pages/my-order/Components/ModalWriteReview'
import { createURLpaymentVNPay } from 'src/services/payment'
import { PAYMENT_TYPES } from 'src/configs/payment'
import { formatDate } from 'src/utils/date'

type TProps = {}
const MyOrderPage: NextPage<TProps> = () => {
  // State
  const [isLoading, setIsLoading] = useState(false)
  const [dataOrder, setDataOrder] = useState<any>({} as any)
  const [openCancel, setOpenCancel] = useState(false)
  const [openReview, setOpenReview] = useState({
    open: false,
    userId: '',
    productId: ''
  })
  // ** Hooks
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const orderId = router.query.orderId as string
  const { user } = useAuth()
  const PAYMENT_DATA = PAYMENT_TYPES()
  // ** theme
  const theme = useTheme()
  // ** redux
  const dispatch: AppDispatch = useDispatch()
  const { isSuccessCancelMe, orderItems, isErrorCancelMe, messageErrorCancelMe } = useSelector(
    (state: RootState) => state.orderProduct
  )
  const {
    isSuccessCreate,
    isErrorCreate,
    messageErrorCreate,
    isLoading: loadingReview
  } = useSelector((state: RootState) => state.reviews)
  // ** fetch API
  const handleConfirmCancel = () => {
    dispatch(cancelOrderProductOfMeAsync(dataOrder.id))
  }
  // ** handle
  const handleCloseReview = () => {
    setOpenReview({ open: false, productId: '', userId: '' })
  }

  const handlePaymentVNPay = async () => {
    setIsLoading(true)
    await createURLpaymentVNPay({
      amount: dataOrder.totalPrice,
      orderId: dataOrder?.id,
      language: i18n.language === 'vi' ? 'vn' : i18n.language
    }).then(res => {
      if (res) {
        window.open(res?.paymentUrl, '_blank')
      }
      setIsLoading(false)
    })
  }
  const handlePaymentTypeOrder = (type: string) => {
    switch (type) {
      case PAYMENT_DATA.VN_PAYMENT.value: {
        handlePaymentVNPay()
        break
      }
      default:
        break
    }
  }

  const handleCloseDialog = () => {
    setOpenCancel(false)
  }
  const handleGetDetailsOrdersOfMe = async () => {
    setIsLoading(true)
    await getDetailsOrderProductByMe(orderId).then(res => {
      setDataOrder(res?.data)
      setIsLoading(false)
    })
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
        slug: item?.slug
      }))
    )
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
    return dataOrder?.orderItemList?.some((item: any) => !item.countInStock)
  }, [dataOrder?.orderItemList])
  useEffect(() => {
    if (orderId) {
      handleGetDetailsOrdersOfMe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId])
  useEffect(() => {
    if (isSuccessCancelMe) {
      handleGetDetailsOrdersOfMe()
      dispatch(resetInitialState())
    } else if (isErrorCancelMe && messageErrorCancelMe) {
      toast.error(t('Cancel_order_error'))
      dispatch(resetInitialState())
    }
  }, [isSuccessCancelMe, isErrorCancelMe, messageErrorCancelMe])
  useEffect(() => {
    if (isSuccessCreate) {
      handleGetDetailsOrdersOfMe()
      toast.success(t('Write_review_success'))
      dispatch(resetInitialReview())
      handleCloseReview()
    } else if (isErrorCreate && messageErrorCreate) {
      toast.error(t('Write_review_error'))
      dispatch(resetInitialReview())
    }
  }, [isSuccessCreate, isErrorCreate, messageErrorCreate])
  return (
    <>
      {isLoading && <Spinner />}
      <ModalWriteReview
        open={openReview.open}
        productId={openReview.productId}
        userId={openReview.userId}
        onClose={handleCloseReview}
      />
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, gap: 2, alignItems: 'center' }}>
          <Button startIcon={<Icon icon='fluent-mdl2:chrome-back'></Icon>} onClick={() => router.back()}>
            {t('Back')}
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {dataOrder?.orderStatus === 2 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Icon icon='carbon:delivery'></Icon>
                <Typography>
                  <span style={{ color: theme.palette.success.main }}>{t('Order_has_been_delivery')}</span>
                  <span>{' | '}</span>
                </Typography>
              </Box>
            )}
            <Typography sx={{ textTransform: 'uppercase', color: theme.palette.primary.main, fontWeight: 600 }}>
              {t(`${(STATUS_ORDER_PRODUCT as any)[dataOrder?.orderStatus]?.label}`)}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box mt={2} mb={2} sx={{ display: 'flex', flexDirection: 'column', gap: 4, cursor: 'pointer' }}>
          {dataOrder?.orderItemList?.map((item: TItemProductMe) => {
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
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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
                    {+dataOrder.orderStatus === +STATUS_ORDER_PRODUCT[2].value && (
                      <Button
                        onClick={() => setOpenReview({ open: true, productId: item?.id, userId: user ? user?.id : '' })}
                      >
                        {t('Write_review')}
                      </Button>
                    )}
                  </Box>
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
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '2px', mt: 4 }}>
              <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>{t('Address_shipping')}:</Typography>
              <Typography sx={{ fontSize: '18px', fontWeight: 600, color: theme.palette.primary.main }}>
                {dataOrder?.shippingAddress?.address} {dataOrder?.shippingAddress?.city?.name}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '2px', mt: 4 }}>
              <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>{t('Phone_number')}:</Typography>
              <Typography sx={{ fontSize: '18px', fontWeight: 600, color: theme.palette.primary.main }}>
                {dataOrder?.shippingAddress?.phone}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '2px', mt: 4 }}>
              <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>{t('Order_name_user')}:</Typography>
              <Typography sx={{ fontSize: '18px', fontWeight: 600, color: theme.palette.primary.main }}>
                {dataOrder?.shippingAddress?.fullName}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '2px', mt: 4 }}>
              <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>{t('Item_price')}:</Typography>
              <Typography sx={{ fontSize: '18px', fontWeight: 600, color: theme.palette.primary.main }}>
                {formatNumberToLocal(dataOrder?.itemsPrice)} VND
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '2px', mt: 4 }}>
              <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>{t('Shipping_price')}:</Typography>
              <Typography sx={{ fontSize: '18px', fontWeight: 600, color: theme.palette.primary.main }}>
                {formatNumberToLocal(dataOrder?.shippingPrice)} VND
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '2px', mt: 4 }}>
              <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>{t('Sum_money')}:</Typography>
              <Typography sx={{ fontSize: '18px', fontWeight: 600, color: theme.palette.primary.main }}>
                {formatNumberToLocal(dataOrder?.totalPrice)} VND
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Icon icon='carbon:delivery'></Icon>
            <Typography>
              {!!dataOrder.isDelivered ? (
                <>
                  <span style={{ color: theme.palette.success.main, fontSize: '16px' }}>
                    {t('Order_has_been_delivery')}
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    {' '}
                    {formatDate(dataOrder.deliveryAt, { dateStyle: 'short' })}
                  </span>
                </>
              ) : (
                <span style={{ color: theme.palette.error.main, fontSize: '16px' }}>
                  {t('Order_has_not_been_delivery')}
                </span>
              )}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Icon icon='streamline:payment-10'></Icon>
            <Typography>
              {!!dataOrder.isPaid ? (
                <>
                  <span style={{ color: theme.palette.success.main, fontSize: '16px' }}>
                    {t('Order_has_been_paid')}
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    {' '}
                    {formatDate(dataOrder.paidAt, { dateStyle: 'short' })}
                  </span>
                </>
              ) : (
                <span style={{ color: theme.palette.error.main, fontSize: '16px' }}>
                  {t('Order_has_not_been_paid')}
                </span>
              )}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: 6, justifyContent: 'flex-end' }}>
          {[0].includes(dataOrder.orderStatus) && dataOrder.paymentMethod.type != PAYMENT_DATA.PAYMENT_LATER.value && (
            <Button
              variant='outlined'
              onClick={() => handlePaymentTypeOrder(dataOrder.paymentMethod.type)}
              sx={{
                height: 40,
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                backgroundColor: 'transparent !important'
              }}
            >
              {t('Payment')}
            </Button>
          )}
          {[0, 1].includes(dataOrder?.orderStatus) && (
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
          >
            {t('Buy_again')}
          </Button>
        </Box>
      </Box>
    </>
  )
}
export default MyOrderPage
