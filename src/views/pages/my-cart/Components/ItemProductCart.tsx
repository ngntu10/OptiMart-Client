// ** React
import { Fragment, useEffect, useState } from 'react'
// ** Next
import Link from 'next/link'
// ** Mui
import { Avatar, Box, Checkbox, Divider, IconButton, Typography, useTheme } from '@mui/material'
// ** Components
import Icon from 'src/components/Icon'
import CustomTextField from 'src/components/text-field'
// Helpers
import { getLocalProductCart, setLocalProductToCart } from 'src/helpers/storage'
import { cloneDeep, convertUpdateProductToCart, formatNumberToLocal, isExpiry } from 'src/utils'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
//  ** Hooks
import { useAuth } from 'src/hooks/useAuth'
// ** Redux
import { AppDispatch, RootState } from 'src/stores'
import { updateProductToCart } from 'src/stores/order-product'
// ** Types
import { TItemOrderProduct } from 'src/types/order-product'
// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { getDetailsProduct } from 'src/services/product'
type TProps = {
  item: TItemOrderProduct
  index: number
  selectedRows: string[]
  handleChangeCheckbox: (value: string) => void
}
interface TItemOrderProductState extends TItemOrderProduct {
  countInStock?: number
}
const ItemProductCart = ({ item, index, selectedRows, handleChangeCheckbox }: TProps) => {
  // ** State
  const [itemState, setItemState] = useState<TItemOrderProductState>(item)
  // ** Hooks
  const { user } = useAuth()
  const theme = useTheme()
  //  ** Redux
  const dispatch: AppDispatch = useDispatch()
  const { orderItems } = useSelector((state: RootState) => state.orderProduct)
  // ** fetch
  const fetchDetailsProduct = async (id: string) => {
    const res = await getDetailsProduct(id)
    const data = res.data
    if (data) {
      const discountItem = isExpiry(data.discountStartDate, data.discountEndDate) ? data.discount : 0
      setItemState({
        name: data.name,
        amount: item.amount,
        image: data.image,
        price: data.price,
        discount: discountItem,
        id: id,
        slug: data.slug,
        countInStock: data.countInStock
      })
    }
  }
  useEffect(() => {
    if (item.id) {
      fetchDetailsProduct(item.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id])
  useEffect(() => {
    setItemState(prev => ({ ...prev, amount: item.amount }))
  }, [item.amount])
  // handle
  const handleChangeAmountCart = (item: TItemOrderProduct, amount: number) => {
    const productCart = getLocalProductCart()
    const parseData = productCart ? JSON.parse(productCart) : {}
    const listOrderItems = convertUpdateProductToCart(orderItems, {
      name: item.name,
      amount: amount,
      image: item.image,
      price: item.price,
      discount: item.discount,
      id: item.id,
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
    const filteredItems = cloneOrderItems.filter((item: TItemOrderProduct) => item.id !== id)
    if (user) {
      dispatch(
        updateProductToCart({
          orderItems: filteredItems
        })
      )
      setLocalProductToCart({ ...parseData, [user?.id]: filteredItems })
    }
  }
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
        <Box sx={{ width: 'calc(10% - 100px)' }}>
          <Checkbox
            disabled={!itemState?.countInStock}
            checked={selectedRows.includes(itemState.id)}
            value={itemState.id}
            onChange={e => {
              handleChangeCheckbox(e.target.value)
            }}
          />
        </Box>
        <Avatar sx={{ width: '100px', height: '100px' }} src={itemState.image} />
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
          <Link href={`/product/${itemState.slug}`}>{itemState.name}</Link>
        </Typography>
        <Box sx={{ flexBasis: '20%' }}>
          <Typography
            variant='h6'
            mt={2}
            sx={{
              color: itemState.discount > 0 ? theme.palette.error.main : theme.palette.primary.main,
              fontWeight: 'bold',
              textDecoration: itemState.discount > 0 ? 'line-through' : 'normal',
              fontSize: '18px'
            }}
          >
            {formatNumberToLocal(itemState.price)} VND
          </Typography>
        </Box>
        <Box sx={{ flexBasis: '20%', display: 'flex', alignItems: 'center', gap: 1 }}>
          {itemState.discount > 0 && (
            <Typography
              variant='h4'
              mt={2}
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 'bold',
                fontSize: '18px'
              }}
            >
              {formatNumberToLocal((itemState.price * (100 - itemState.discount)) / 100)}
            </Typography>
          )}
          {itemState.discount > 0 && (
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
                - {itemState.discount} %
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ flexBasis: '10%', mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            disabled={!itemState?.countInStock}
            onClick={() => handleChangeAmountCart(item, -1)}
            sx={{
              backgroundColor: `${theme.palette.primary.main} !important`,
              color: `${theme.palette.common.white}`
            }}
          >
            <Icon icon='ic:sharp-minus' />
          </IconButton>
          <CustomTextField
            disabled={!itemState?.countInStock}
            type='number'
            value={itemState.amount}
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
             disabled={!itemState?.countInStock}
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
          <IconButton onClick={() => handleDeleteProductCart(itemState.id)}>
            <Icon icon='mdi:delete-outline' />
          </IconButton>
        </Box>
      </Box>
      {index !== orderItems.length - 1 && <Divider />}
    </Box>
  )
}
export default ItemProductCart