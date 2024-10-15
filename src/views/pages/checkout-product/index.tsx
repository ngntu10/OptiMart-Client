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
import ModalAddAddress from 'src/views/pages/checkout-product/Components/ModalAddAddress'
import Spinner from 'src/components/spinner'
import ModalWarning from 'src/views/pages/checkout-product/Components/ModalWarning'

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
import Swal from 'sweetalert2'
import { getLocalProductCart, setLocalProductToCart } from 'src/helpers/storage'

// ** Services
import { getAllPaymentTypes } from 'src/services/payment-type'
import { getAllDeliveryTypes } from 'src/services/delivery-type'
import toast from 'react-hot-toast'
import { resetInitialState, updateProductToCart } from 'src/stores/order-product'
import { getAllCities } from 'src/services/city'

type TProps = {}

const CheckoutProductPage: NextPage<TProps> = () => {
  // State
  const [optionPayments, setOptionPayments] = useState<{ label: string; value: string }[]>([])
  const [optionDeliveries, setOptionDeliveries] = useState<{ label: string; value: string; price: string }[]>([])
  const [paymentSelected, setPaymentSelected] = useState('')
  const [deliverySelected, setDeliverySelected] = useState('')
  const [openAddress, setOpenAddress] = useState(false)
  const [optionCities, setOptionCities] = useState<{ label: string; value: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [openWarning, setOpenWarning] = useState(false)

  // ** Hooks
  const { i18n } = useTranslation()
  const { user } = useAuth()
  const router = useRouter()
  // ** theme
  const theme = useTheme()
  // ** redux
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, isErrorCreate, isSuccessCreate, messageErrorCreate, orderItems } = useSelector(
    (state: RootState) => state.orderProduct
  )

  const handleFormatDataProduct = (items: any) => {
    const objectMap: Record<string, TItemOrderProduct> = {}
    orderItems.forEach((order: any) => {
      objectMap[order.product] = order
    })
    return items.map((item: any) => {
      return {
        ...objectMap[item.product],
        amount: item.amount
      }
    })
  }

  const memoQueryProduct = useMemo(() => {
    const result = {
      totalPrice: 0,
      productsSelected: []
    }
    const data: any = router.query
    if (data) {
      result.totalPrice = data.totalPrice || 0
      result.productsSelected = data.productsSelected ? handleFormatDataProduct(JSON.parse(data.productsSelected)) : []
    }
    return result
  }, [router.query, orderItems])
  useEffect(() => {
    const data: any = router.query
    if (!data?.productsSelected) {
      setOpenWarning(true)
    }
  }, [router.query])


  const memoAddressDefault = useMemo(() => {
    const findAddress = user?.addresses?.find(item => (item as any).isDefault == true)
    return findAddress
  }, [user?.addresses])
  const memoNameCity = useMemo(() => {
    const findCity = optionCities.find(item => item.value === (memoAddressDefault?.city as any)?.id)
    console.log(optionCities, memoAddressDefault);
    return findCity?.label
  }, [memoAddressDefault, optionCities])
  const memoPriceShipping = useMemo(() => {
    const findItemPrice = optionDeliveries?.find(item => item.value === deliverySelected)
    return findItemPrice ? +findItemPrice?.price : 0
  }, [deliverySelected])

  // ** Handle
  const onChangeDelivery = (value: string) => {
    setDeliverySelected(value)
  }
  const onChangePayment = (value: string) => {
    setPaymentSelected(value)
  }
  const handleOrderProduct = () => {
    const totalPrice = memoPriceShipping + Number(memoQueryProduct.totalPrice)
    dispatch(
      createOrderProductAsync({
        orderItems: memoQueryProduct.productsSelected as TItemOrderProduct[],
        itemsPrice: +memoQueryProduct.totalPrice,
        paymentMethod: paymentSelected,
        deliveryMethod: deliverySelected,
        user: user ? user?.id : '',
        fullName: memoAddressDefault
          ? toFullName(
              memoAddressDefault?.lastName,
              memoAddressDefault?.middleName,
              memoAddressDefault?.firstName,
              i18n.language
            )
          : '',
        address: memoAddressDefault ? memoAddressDefault.address : '',
        city: memoAddressDefault ? memoAddressDefault.city : '',
        phone: memoAddressDefault ? memoAddressDefault.phoneNumber : '',
        shippingPrice: memoPriceShipping,
        totalPrice: totalPrice
      })
    )
  }
  // ** Fetch API
  const handleGetListPaymentMethod = async () => {
    setLoading(true)
    await getAllPaymentTypes({ params: { limit: 20, page: 1 } })
      .then((res: any) => {
        if (res.data) {
          setOptionPayments(
            res?.data?.data?.map((item: { name: string; id: string }) => ({
              label: item.name,
              value: item.id
            }))
          )
          setPaymentSelected(res?.data?.paymentTypes?.[0]?.id)
        }
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
      })
  }
  const fetchAllCities = async () => {
    setLoading(true)
    await getAllCities({ params: { limit: -1, page: -1 } })
      .then(res => {
        const data = res?.data
        if (data) {
          setOptionCities(data?.map((item: { name: string; id: string }) => ({ label: item.name, value: item.id })))
        }
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
      })
  }
  const handleGetListDeliveryMethod = async () => {
    setLoading(true)
    await getAllDeliveryTypes({ params: { limit: 20, page: 1 } })
      .then((res: any) => {
        if (res.data) {
          setOptionDeliveries(
            res?.data?.map((item: { name: string; id: string; price: string }) => ({
              label: item.name,
              value: item.id,
              price: item.price
            }))
          )
          setLoading(false)
          setDeliverySelected(res?.data?.deliveryTypes?.[0]?.id)
        }
      })
      .catch(e => {
        setLoading(false)
      })
  }
  useEffect(() => {
    fetchAllCities()
    handleGetListPaymentMethod()
    handleGetListDeliveryMethod()
  }, [])

  const handleChangeAmountCart = (items: TItemOrderProduct[]) => {
    const productCart = getLocalProductCart()
    const parseData = productCart ? JSON.parse(productCart) : {}
    const objectMap: Record<string, number> = {}
    items.forEach((item: any) => {
      objectMap[item.product] = -item.amount
    })
    const listOrderItems:TItemOrderProduct[] = []
    orderItems.forEach((order:TItemOrderProduct) => {
      if(objectMap[order.product]) {
        listOrderItems.push({
          ...order,
          amount: order.amount + objectMap[order.product]
        })
      }else {
        listOrderItems.push(order)
      }
    })
    const filterListOrder = listOrderItems.filter((item:TItemOrderProduct ) => item.amount)
    if (user) {
      dispatch(
        updateProductToCart({
          orderItems: filterListOrder
        })
      )
      setLocalProductToCart({ ...parseData, [user?.id]: filterListOrder })
    }
  }

  useEffect(() => {
    if (isSuccessCreate) {
      Swal.fire({
        title: t('Congraturation!'),
        text: t('Order_product_success'),
        icon: 'success',
        confirmButtonText: t('Confirm'),
        background: theme.palette.background.paper,
        color: `rgba(${theme.palette.customColors.main}, 0.78)`
      }).then(result => {
        if (result.isConfirmed) {
        }
      })
      handleChangeAmountCart(memoQueryProduct.productsSelected)
    
      dispatch(resetInitialState())
    } else if (isErrorCreate && messageErrorCreate) {
      toast.error(t('Order_product_error'))
      Swal.fire({
        title: t('Opps!'),
        text: t('Order_product_error'),
        icon: 'error',
        confirmButtonText: t('Confirm'),
        background: theme.palette.background.paper,
        color: `rgba(${theme.palette.customColors.main}, 0.78)`
      })
      dispatch(resetInitialState())
    }
  }, [isSuccessCreate, isErrorCreate, messageErrorCreate])


  return (
    <>
      {/* {loading || (isLoading && <Spinner />)} */}
      {loading || (isLoading && <Spinner />)}
      <ModalWarning open={openWarning} onClose={() => setOpenAddress(false)} />
      <ModalAddAddress open={openAddress} onClose={() => setOpenAddress(false)} />
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: '40px',
          width: '100%',
          borderRadius: '15px',
          mb: 6
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <Icon icon='carbon:location' style={{ color: theme.palette.primary.main }} />
            <Typography
              variant='h6'
              sx={{
                fontWeight: 'bold',
                fontSize: '18px',
                color: theme.palette.primary.main
              }}
            >
              {t('Address_shipping')}
            </Typography>
          </Box>
          {user?.address}
          <Box>
            {user && user?.addresses?.length > 0 ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography
                  sx={{ color: `rgba(${theme.palette.customColors.main}, 0.78)`, fontSize: '18px', fontWeight: 'bold' }}
                >
                  {memoAddressDefault?.phoneNumber}{' '}
                  {toFullName(
                    memoAddressDefault?.lastName || '',
                    memoAddressDefault?.middleName || '',
                    memoAddressDefault?.firstName || '',
                    i18n.language
                  )}
                </Typography>
                <Typography component='span' sx={{ fontSize: '18px' }}>
                  {memoAddressDefault?.address}, {memoNameCity}
                </Typography>
                <Button sx={{ border: `1px solid ${theme.palette.primary.main}` }} onClick={() => setOpenAddress(true)}>
                  {t('Change_address')}
                </Button>
              </Box>
            ) : (
              <Button sx={{ border: `1px solid ${theme.palette.primary.main}` }} onClick={() => setOpenAddress(true)}>
                {t('Add_address')}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
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
        <Box sx={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: '2px' }}>
            <Typography sx={{ fontSize: '20px', width: '200px' }}>{t('Price_item')}:</Typography>
            <Typography sx={{ fontSize: '20px', width: '200px' }}>
              {formatNumberToLocal(memoQueryProduct.totalPrice)} VND
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '2px' }}>
            <Typography sx={{ fontSize: '20px', width: '200px' }}>{t('Price_shipping')}:</Typography>
            <Typography sx={{ fontSize: '20px', width: '200px' }}>
              {formatNumberToLocal(memoPriceShipping)} VND
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '2px' }}>
            <Typography sx={{ fontSize: '20px', width: '200px', fontWeight: 600 }}>{t('Sum_money')}:</Typography>
            <Typography sx={{ fontSize: '20px', width: '200px', fontWeight: 600, color: theme.palette.primary.main }}>
              {formatNumberToLocal(+memoQueryProduct.totalPrice + +memoPriceShipping)} VND
            </Typography>
          </Box>
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
