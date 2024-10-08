// ** Next
import { NextPage } from 'next'
// ** React
import { Fragment, useEffect, useMemo, useState } from 'react'
// ** Mui
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material'
// ** Components
import CustomTextField from 'src/components/text-field'
import Icon from 'src/components/Icon'
import CustomSelect from 'src/components/custom-select'
import NoData from 'src/components/no-data'
// ** Translate
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'
// ** Utils
import { formatNumberToLocal, toFullName } from 'src/utils'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { createOrderProductAsync } from 'src/stores/order-product/actions'
// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
// ** Other
import { TItemOrderProduct } from 'src/types/order-product'
import { useRouter } from 'next/router'
// ** Services
import { getAllPaymentTypes } from 'src/services/payment-type'
import { getAllDeliveryTypes } from 'src/services/delivery-type'
import toast from 'react-hot-toast'
import { resetInitialState } from 'src/stores/order-product'
type TProps = {}
type TDefaultValue = {
  email: string
  address: string
  city: string
  phoneNumber: string
  role: string
  fullName: string
}
const CheckoutProductPage: NextPage<TProps> = () => {
  // State
  const [optionPayments, setOptionPayments] = useState<{ label: string; value: string }[]>([])
  const [optionDeliveries, setOptionDeliveries] = useState<{ label: string; value: string; price: string }[]>([])
  const [paymentSelected, setPaymentSelected] = useState('')
  const [deliverySelected, setDeliverySelected] = useState('')
  // ** Hooks
  const { i18n } = useTranslation()
  const { user } = useAuth()
  const router = useRouter()
  // ** theme
  const theme = useTheme()
  // ** redux
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, isErrorCreate, isSuccessCreate, messageErrorCreate, typeError } = useSelector(
    (state: RootState) => state.orderProduct
  )
  const memoQueryProduct = useMemo(() => {
    const result = {
      totalPrice: 0,
      productsSelected: []
    }
    const data: any = router.query
    if (data) {
      result.totalPrice = data.totalPrice || 0
      result.productsSelected = data.productsSelected ? JSON.parse(data.productsSelected) : []
    }
    return result
  }, [router.query])
  // ** Handle
  const onChangeDelivery = (value: string) => {
    setDeliverySelected(value)
  }
  const onChangePayment = (value: string) => {
    setPaymentSelected(value)
  }
  const handleOrderProduct = () => {
    const findItemPrice = optionDeliveries?.find(item => item.value === deliverySelected)
    const shippingPrice = findItemPrice ? +findItemPrice.price : 0
    const totalPrice = shippingPrice + Number(memoQueryProduct.totalPrice)
    dispatch(
      createOrderProductAsync({
        orderItems: memoQueryProduct.productsSelected as TItemOrderProduct[],
        itemsPrice: +memoQueryProduct.totalPrice,
        paymentMethod: paymentSelected,
        deliveryMethod: deliverySelected,
        user: user ? user?.id : '',
        fullName: user ? toFullName(user?.lastName, user?.middleName, user?.firstName, i18n.language) || 'khanh' : '',
        address: user ? user.address || 'Ho chi miun' : '',
        city: user ? user.city : '',
        phone: user ? user.phoneNumber : '',
        shippingPrice: shippingPrice,
        totalPrice: totalPrice
      })
    )
    console.log('memoQueryProduct', { memoQueryProduct, user })
  }
  // ** Fetch API
  const handleGetListPaymentMethod = async () => {
    await getAllPaymentTypes({ params: { limit: 20, page: 1 } }).then((res: any) => {
      if (res.data) {
        setOptionPayments(
          res?.data?.data.map((item: { name: string; id: string }) => ({
            label: item.name,
            value: item.id
          }))
        )
        setPaymentSelected(res?.data?.paymentTypes?.[0]?.id)
      }
    })  
  }
  const handleGetListDeliveryMethod = async () => {
    await getAllDeliveryTypes({ params: { limit: 20, page: 1 } }).then(res => {
      if (res.data) {
        console.log(res?.data);
        setOptionDeliveries(
          res?.data?.map((item: { name: string; id: string; price: string }) => ({
            label: item.name,
            value: item.id,
            price: item.price
          }))
        )
        setDeliverySelected(res?.data?.deliveryTypes?.[0]?.id)
      }
    })
  }
  useEffect(() => {
    handleGetListPaymentMethod()
    handleGetListDeliveryMethod()
  }, [])
  useEffect(() => {
    if (isSuccessCreate) {
      toast.success(t('Order_product_success'))
      dispatch(resetInitialState())
    } else if (isErrorCreate && messageErrorCreate) {
      toast.error(t('Order_product_error'))
      dispatch(resetInitialState())
    }
  }, [isSuccessCreate, isErrorCreate, messageErrorCreate])
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
        {memoQueryProduct?.productsSelected?.length > 0 ? (
          <Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: '8px', mb: '10px' }}>
              <Typography sx={{ width: '80px', marginLeft: '20px', fontWeight: 600 }}>{t('Image')}</Typography>
              <Typography sx={{ flexBasis: '35%', fontWeight: 600 }}>{t('Name_product')}</Typography>
              <Typography sx={{ flexBasis: '20%', fontWeight: 600 }}>{t('Price_original')}</Typography>
              <Typography sx={{ flexBasis: '20%', fontWeight: 600 }}>{t('Price_discount')}</Typography>
              <Typography sx={{ flexBasis: '10%', fontWeight: 600 }}>{t('Count')}</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '10px', mt: '10px' }}>
              {memoQueryProduct?.productsSelected?.map((item: TItemOrderProduct, index: number) => {
                return (
                  <Fragment key={item.product}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Avatar sx={{ width: '100px', height: '100px' }} src={item.image} />
                      <Typography
                        sx={{
                          fontSize: '20px',
                          flexBasis: '35%',
                          maxWidth: '100%',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          display: 'block',
                          mt: 2
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Box sx={{ flexBasis: '20%' }}>
                        <Typography
                          variant='h6'
                          mt={2}
                          sx={{
                            color: item.discount > 0 ? theme.palette.error.main : theme.palette.primary.main,
                            fontWeight: 'bold',
                            textDecoration: item.discount > 0 ? 'line-through' : 'normal',
                            fontSize: '18px'
                          }}
                        >
                          {formatNumberToLocal(item.price)} VND
                        </Typography>
                      </Box>
                      <Box sx={{ flexBasis: '20%', display: 'flex', alignItems: 'center', gap: 1 }}>
                        {item.discount > 0 && (
                          <Typography
                            variant='h4'
                            mt={2}
                            sx={{
                              color: theme.palette.primary.main,
                              fontWeight: 'bold',
                              fontSize: '18px'
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
                      <Box sx={{ flexBasis: '10%' }}>
                        <Typography
                          variant='h6'
                          mt={2}
                          sx={{
                            color: theme.palette.primary.main,
                            fontWeight: 'bold',
                            fontSize: '18px'
                          }}
                        >
                          {item.amount}
                        </Typography>
                      </Box>
                    </Box>
                    {index !== memoQueryProduct?.productsSelected?.length - 1 && <Divider />}
                  </Fragment>
                )
              })}
            </Box>
          </Fragment>
        ) : (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ padding: '20px', width: '200px' }}>
              <NoData widthImage='80px' heightImage='80px' textNodata={t('No_product')} />
            </Box>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: '40px',
          width: '100%',
          borderRadius: '15px',
          mt: 6
        }}
      >
        <Box>
          <FormControl sx={{ flexDirection: 'row !important', gap: 10 }}>
            <FormLabel sx={{ color: theme.palette.primary.main, fontWeight: 600, width: '260px' }} id='delivery-group'>
              {t('Select_delivery_type')}
            </FormLabel>
            <RadioGroup
              sx={{ position: 'relative', top: '-6px' }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeDelivery(e.target.value)}
              aria-labelledby='delivery-group'
              name='radio-delivery-group'
            >
              {optionDeliveries &&
                optionDeliveries.map(delivery => {
                  return (
                    <FormControlLabel
                      key={delivery.value}
                      value={delivery.value}
                      control={<Radio checked={deliverySelected === delivery.value} />}
                      label={delivery.label}
                    />
                  )
                })}
            </RadioGroup>
          </FormControl>
        </Box>
        <Box sx={{ mt: 4 }}>
          <FormControl sx={{ flexDirection: 'row !important', gap: 10 }}>
            <FormLabel sx={{ color: theme.palette.primary.main, fontWeight: 600, width: '260px' }} id='payment-group'>
              {t('Select_payment_type')}
            </FormLabel>
            <RadioGroup
              sx={{ position: 'relative', top: '-6px' }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangePayment(e.target.value)}
              aria-labelledby='payment-group'
              name='radio-payment-group'
            >
              {optionPayments &&
                optionPayments.map(payment => {
                  return (
                    <FormControlLabel
                      key={payment.value}
                      value={payment.value}
                      control={<Radio checked={paymentSelected === payment.value} />}
                      label={payment.label}
                    />
                  )
                })}
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button
          onClick={handleOrderProduct}
          variant='contained'
          sx={{
            height: 40,
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            fontWeight: 'bold'
          }}
        >
          {t('Đặt hàng')}
        </Button>
      </Box>
    </>
  )
}
export default CheckoutProductPage
