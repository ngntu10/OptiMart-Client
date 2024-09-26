import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import Icon from 'src/components/Icon'
import { Box, Button, Rating } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { TProduct } from 'src/types/product'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
interface TCardProduct {
  item: TProduct
}
const StyleCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  boxShadow: theme.shadows[4]
}))
const CardProduct = (props: TCardProduct) => {
  // ** Props
  const { item } = props
  const { t } = useTranslation()
  const theme = useTheme()
  console.log('item', { item })
  return (
    <StyleCard sx={{ width: '100%' }}>
      <CardMedia component='img' height='194' image={item.image} alt='image' />
      <CardContent sx={{ padding: '8px 12px' }}>
        <Typography
          variant='h5'
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 'bold'
          }}
        >
          {item.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {item.discount > 0 && (
            <Typography
              variant='h6'
              sx={{
                color: theme.palette.error.main,
                fontWeight: 'bold',
                textDecoration: 'line-through',
                fontSize: '14px'
              }}
            >
              {item.price}
            </Typography>
          )}
          <Typography
            variant='h4'
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 'bold',
              fontSize: '18px'
            }}
          >
            {item.discount > 0 ? <>{(item.price * (100 - item.discount)) / 100}</> : <>{item.price}</>} VND
          </Typography>
          {item.discount > 0 && (
            <Box
              sx={{
                backgroundColor: hexToRGBA(theme.palette.error.main, 0.42),
                width: '25px',
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
                  fontSize: '10px'
                }}
              >
                {item.discount} %
              </Typography>
            </Box>
          )}
        </Box>
        <Typography variant='body2' color='text.secondary'>
          {item.countInStock > 0 ? (
            <>{t('Count_in_stock_product', { count: item.countInStock })}</>
          ) : (
            <span>Hết hàng</span>
          )}
        </Typography>
        {item.sold && (
          <Typography variant='body2' color='text.secondary'>
            <>{t('Sold_product', { count: item.countInStock })}</>
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {!!item.averageRating && (
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                <b>{item.averageRating}</b>
                <Icon icon='emojione:star' fontSize={16} style={{ position: 'relative', top: '-1' }} />
              </Typography>
            )}
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              {!!item.totalReviews ? <b>{item.totalReviews}</b> : <span>{t('not_review')}</span>}
            </Typography>
          </Box>
          <IconButton>
            <Icon icon='mdi:heart' />
          </IconButton>
        </Box>
      </CardContent>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 12px 10px', gap: 2 }}>
        <Button
          variant='outlined'
          fullWidth
          sx={{
            height: 40,
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            fontWeight: 'bold'
          }}
        >
          <Icon icon='bx:cart' fontSize={24} style={{ position: 'relative', top: '-2px' }} />
          {t('Add_to_cart')}
        </Button>
        <Button
          fullWidth
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
    </StyleCard>
  )
}
export default CardProduct