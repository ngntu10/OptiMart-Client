// ** Next
import { NextPage } from 'next'

// ** React
import { Fragment, useMemo, useState } from 'react'

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
import { TItemOrderProduct } from 'src/types/order-product'
import { getLocalProductCart, setLocalProductToCart } from 'src/helpers/storage'
import NoData from 'src/components/no-data'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'

type TProps = {}
type TDefaultValue = {
  email: string
  address: string
  city: string
  phoneNumber: string
  role: string
  fullName: string
}
const MyCartPage: NextPage<TProps> = () => {
  // State
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  // ** Hooks
  const { i18n } = useTranslation()
  const { user } = useAuth()
  const router = useRouter()

  // ** theme
  const theme = useTheme()

  // ** redux
  const dispatch: AppDispatch = useDispatch()
  const { orderItems } = useSelector((state: RootState) => state.orderProduct)

  const memoListAllProductIds = useMemo(() => {
    return orderItems.map((item: TItemOrderProduct) => item.product)
  }, [orderItems])

  const memoItemsSelectedProduct = useMemo(() => {
    return selectedRows.map(idSelected => {
      const findItem: any = orderItems.find((item: TItemOrderProduct) => item.product === idSelected)
      if (findItem) {
        return {
          ...findItem
        }
      }
    })
  }, [selectedRows, orderItems])
  const memoTotalSelectedProduct = useMemo(() => {
    const total = memoItemsSelectedProduct.reduce((result, current: TItemOrderProduct) => {
      const currentPrice = current.discount > 0 ? (current.price * (100 - current.discount)) / 100 : current.price
      return result + currentPrice * current.amount
    }, 0)
    return total
  }, [memoItemsSelectedProduct])

  // ** Handle
  const handleChangeAmountCart = (item: TItemOrderProduct, amount: number) => {
    const productCart = getLocalProductCart()
    const parseData = productCart ? JSON.parse(productCart) : {}
    const listOrderItems = convertUpdateProductToCart(orderItems, {
      name: item.name,
      amount: amount,
      image: item.image,
      price: item.price,
      discount: item.discount,
      product: item.product,
      slug: item.slug
    })
    if (user) {
      dispatch(
        updateProductToCart({
          orderItems: listOrderItems
        })
      )
      setLocalProductToCart({ ...parseData, [user?.id]: listOrderItems })
    }
  }
  const handleDeleteProductCart = (id: string) => {
    const productCart = getLocalProductCart()
    const parseData = productCart ? JSON.parse(productCart) : {}
    const cloneOrderItems = cloneDeep(orderItems)
    const filteredItems = cloneOrderItems.filter((item: TItemOrderProduct) => item.product !== id)
    if (user) {
      dispatch(
        updateProductToCart({
          orderItems: filteredItems
        })
      )
      setLocalProductToCart({ ...parseData, [user?.id]: filteredItems })
    }
  }
  const handleChangeCheckbox = (value: string) => {
    const isChecked = selectedRows.includes(value)
    if (isChecked) {
      const filtered = selectedRows.filter(item => item !== value)
      setSelectedRows(filtered)
    } else {
      setSelectedRows([...selectedRows, value])
    }
  }
  const handleChangeCheckAll = () => {
    const isCheckedAll = memoListAllProductIds.every(id => selectedRows.includes(id))
    if (isCheckedAll) {
      setSelectedRows([])
    } else {
      setSelectedRows(memoListAllProductIds)
    }
  }
  const handleDeleteMany = () => {
    const productCart = getLocalProductCart()
    const parseData = productCart ? JSON.parse(productCart) : {}
    const cloneOrderItems = cloneDeep(orderItems)
    const filteredItems = cloneOrderItems.filter((item: TItemOrderProduct) => !selectedRows.includes(item.product))
    if (user) {
      dispatch(
        updateProductToCart({
          orderItems: filteredItems
        })
      )
      setLocalProductToCart({ ...parseData, [user?.id]: filteredItems })
    }
  }

  const handleNavigateCheckoutProduct = () => {
    console.log('check')
    const formatData = JSON.stringify(memoItemsSelectedProduct)
    router.push(
      {
        pathname: ROUTE_CONFIG.CHECKOUT_PRODUCT,
        query: {
          totalPrice: memoTotalSelectedProduct,
          productsSelected: formatData
        }
      },
      'checkout-product'
    )
  }

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
        {orderItems.length > 0 ? (
          <Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: '8px', mb: '10px' }}>
              <Box sx={{ width: 'calc(10% - 100px)' }}>
                <Tooltip title={t('Select_all')}>
                  <Checkbox
                    onChange={handleChangeCheckAll}
                    checked={memoListAllProductIds.every(id => selectedRows.includes(id))}
                  />
                </Tooltip>
              </Box>
              <Typography sx={{ width: '80px', marginLeft: '20px', fontWeight: 600 }}>{t('Image')}</Typography>
              <Typography sx={{ flexBasis: '35%', fontWeight: 600 }}>{t('Name_product')}</Typography>
              <Typography sx={{ flexBasis: '20%', fontWeight: 600 }}>{t('Price_original')}</Typography>
              <Typography sx={{ flexBasis: '20%', fontWeight: 600 }}>{t('Price_discount')}</Typography>
              <Typography sx={{ flexBasis: '10%', fontWeight: 600 }}>{t('Count')}</Typography>
              <Box sx={{ flexBasis: '5%', display: 'flex', justifyContent: 'flex-end' }}>
                <Tooltip title={t('Delete_all')}>
                  <IconButton disabled={!selectedRows.length} onClick={handleDeleteMany}>
                    <Icon icon='mdi:delete-outline' />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '10px', mt: '10px' }}>
              {orderItems.map((item: TItemOrderProduct, index: number) => {
                return (
                  <Fragment key={item.product}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Box sx={{ width: 'calc(10% - 100px)' }}>
                        <Checkbox
                          checked={selectedRows.includes(item.product)}
                          value={item.product}
                          onChange={e => {
                            handleChangeCheckbox(e.target.value)
                          }}
                        />
                      </Box>
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
                            {formatNumberToLocal((item.price * (100 - item.discount)) / 100)} VND
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
                      <Box sx={{ flexBasis: '10%', mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                          onClick={() => handleChangeAmountCart(item, -1)}
                          sx={{
                            backgroundColor: `${theme.palette.primary.main} !important`,
                            color: `${theme.palette.common.white}`
                          }}
                        >
                          <Icon icon='ic:sharp-minus' />
                        </IconButton>
                        <CustomTextField
                          type='number'
                          value={item.amount}
                          inputProps={{
                            inputMode: 'numeric',
                            min: 1
                            // max: dataProduct.countInStock
                          }}
                          margin='normal'
                          sx={{
                            '.MuiInputBase-input.MuiFilledInput-input': {
                              width: '20px'
                            },
                            '.MuiInputBase-root.MuiFilledInput-root': {
                              borderRadius: '0px',
                              borderTop: 'none',
                              borderRight: 'none',
                              borderLeft: 'none',
                              '&.Mui-focused': {
                                backgroundColor: `${theme.palette.background.paper} !important`,
                                boxShadow: 'none !important'
                              }
                            },
                            'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
                              WebkitAppearance: 'none',
                              margin: 0
                            },
                            'input[type=number]': {
                              MozAppearance: 'textfield'
                            }
                          }}
                        />
                        <IconButton
                          onClick={() => handleChangeAmountCart(item, 1)}
                          sx={{
                            backgroundColor: `${theme.palette.primary.main} !important`,
                            color: `${theme.palette.common.white}`
                          }}
                        >
                          <Icon icon='ic:round-plus' />
                        </IconButton>
                      </Box>
                      <Box sx={{ flexBasis: '5%', mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={() => handleDeleteProductCart(item.product)}>
                          <Icon icon='mdi:delete-outline' />
                        </IconButton>
                      </Box>
                    </Box>
                    {index !== orderItems.length - 1 && <Divider />}
                  </Fragment>
                )
              })}
            </Box>
          </Fragment>
        ) : (
          <Box sx={{ padding: '20px', width: '200px' }}>
            <NoData widthImage='80px' heightImage='80px' textNodata={t('No_product')} />
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '2px' }}>
          <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>{t('Sum_money')}:</Typography>
          <Typography sx={{ fontSize: '24px', fontWeight: 600, color: theme.palette.primary.main }}>
            {formatNumberToLocal(memoTotalSelectedProduct)} VND
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button
          onClick={handleNavigateCheckoutProduct}
          disabled={!selectedRows.length}
          variant='contained'
          sx={{
            height: 40,
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            fontWeight: 'bold'
          }}
        >
          <Icon icon='icon-park-outline:buy' fontSize={20} style={{ position: 'relative', top: '-2px' }} />
          {t('Buy_now')}
        </Button>
      </Box>
    </>
  )
}
export default MyCartPage
