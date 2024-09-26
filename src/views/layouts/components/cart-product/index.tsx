// ** React
import React, { useEffect, useMemo } from 'react'
// ** Next
import Image from 'next/image'
import { useRouter } from 'next/router'
// ** Mui Imports
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { Badge, Typography, styled } from '@mui/material'
// ** Components
import Icon from 'src/components/Icon'
// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
// ** Translate
import { useTranslation } from 'react-i18next'
// ** config
// ** Storage
// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { TItemOrderProduct } from 'src/types/order-product'
import { getLocalProductCart } from 'src/helpers/storage'
import { addProductToCart } from 'src/stores/order-product'
type TProps = {}
const CartProduct = (props: TProps) => {
  // ** Translation
  const { t, i18n } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const { user } = useAuth()
  // ** Redux
  const { orderItems } = useSelector((state: RootState) => state.orderProduct)
  const dispatch: AppDispatch = useDispatch()
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  useEffect(() => {
    const productCart = getLocalProductCart()
    const parseData = productCart ? JSON.parse(productCart) : {}
    if (user?.id) {
      dispatch(
        addProductToCart({
          orderItems: parseData[user?.id] || []
        })
      )
    }
  }, [user])
  const totalItemsCart = useMemo(() => {
    const total = orderItems.reduce((result, current: TItemOrderProduct) => {
      return result + current.amount
    }, 0)
    return total
  }, [orderItems])
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={t('Account')}>
          <IconButton onClick={handleClick} color='inherit'>
            {!!orderItems.length ? (
              <Badge color='primary' badgeContent={totalItemsCart}>
                <Icon icon='flowbite:cart-outline' />
              </Badge>
            ) : (
              <Icon icon='flowbite:cart-outline' />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      ></Menu>
    </React.Fragment>
  )
}
export default CartProduct
