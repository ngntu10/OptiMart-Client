// ** Next
import { NextPage } from 'next'
import { useRouter } from 'next/router'

// ** React
import { Fragment, useEffect, useMemo, useState } from 'react'

// ** Mui
import { Avatar, Box, Button, Checkbox, Divider, IconButton, Tooltip, Typography, useTheme } from '@mui/material'

// ** Components
import CustomTextField from 'src/components/text-field'
import Icon from 'src/components/Icon'
import NoData from 'src/components/no-data'

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
import { ROUTE_CONFIG } from 'src/configs/route'
import ItemProductCart from 'src/views/pages/my-cart/Components/ItemProductCart'

type TProps = {}

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
    return orderItems.map((item: TItemOrderProduct) => item.id)
  }, [orderItems])

  const memoItemsSelectedProduct = useMemo(() => {
    const result: TItemOrderProduct[] = []
    selectedRows.forEach(idSelected => {
      const findItem: any = orderItems.find((item: TItemOrderProduct) => item.id === idSelected)
      if (findItem) {
        result.push(findItem)
      }
    })
    return result
  }, [selectedRows, orderItems])
  const memoTotalSelectedProduct = useMemo(() => {
    const total = memoItemsSelectedProduct?.reduce((result, current: TItemOrderProduct) => {
      const currentPrice = current?.discount > 0 ? (current?.price * (100 - current?.discount)) / 100 : current?.price
      return result + currentPrice * current?.amount
    }, 0)
    return total
  }, [memoItemsSelectedProduct])

  useEffect(() => {
    const productSelected = router.query.selected as string
    if (productSelected) {
      if (typeof productSelected === 'string') {
        setSelectedRows([productSelected])
      } else {
        setSelectedRows(productSelected)
      }
    }
  }, [router.query])

  // ** Handle
  // const handleChangeAmountCart = (item: TItemOrderProduct, amount: number) => {
  //   const productCart = getLocalProductCart()
  //   const parseData = productCart ? JSON.parse(productCart) : {}
  //   const listOrderItems = convertUpdateProductToCart(orderItems, {
  //     name: item.name,
  //     amount: amount,
  //     image: item.image,
  //     price: item.price,
  //     discount: item.discount,
  //     id: item.id,
  //     slug: item.slug
  //   })
  //   if (user) {
  //     dispatch(
  //       updateProductToCart({
  //         orderItems: listOrderItems
  //       })
  //     )
  //     setLocalProductToCart({ ...parseData, [user?.id]: listOrderItems })
  //   }
  // }
  // const handleDeleteProductCart = (id: string) => {
  //   const productCart = getLocalProductCart()
  //   const parseData = productCart ? JSON.parse(productCart) : {}
  //   const cloneOrderItems = cloneDeep(orderItems)
  //   const filteredItems = cloneOrderItems.filter((item: TItemOrderProduct) => item.id !== id)
  //   if (user) {
  //     dispatch(
  //       updateProductToCart({
  //         orderItems: filteredItems
  //       })
  //     )
  //     setLocalProductToCart({ ...parseData, [user?.id]: filteredItems })
  //   }
  // }
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
    const filteredItems = cloneOrderItems.filter((item: TItemOrderProduct) => !selectedRows.includes(item.id))
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
    const formatData = JSON.stringify(
      memoItemsSelectedProduct.map(item => ({ product: item.id, amount: item.amount }))
    )
    router.push({
      pathname: ROUTE_CONFIG.CHECKOUT_PRODUCT,
      query: {
        totalPrice: memoTotalSelectedProduct,
        productsSelected: formatData
      }
    })
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
                  <ItemProductCart
                    item={item}
                    index={index}
                    key={item.id}
                    selectedRows={selectedRows}
                    handleChangeCheckbox={handleChangeCheckbox}
                  />
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
          disabled={!selectedRows.length || !memoItemsSelectedProduct.length}
          variant='contained'
          sx={{
            height: 40,
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            fontWeight: 'bold'
          }}
        >
          <Icon icon='icon-park-outline:buy' fontSize={20} style={{ position: 'relative', top: '-2px' }} />x
          {t('Buy_now')}
        </Button>
      </Box>
    </>
  )
}
export default MyCartPage
