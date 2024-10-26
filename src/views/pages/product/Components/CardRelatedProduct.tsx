// ** React
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
// ** Mui
import { styled, useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Box, Rating } from '@mui/material'
import { TProduct } from 'src/types/product'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
/// ** Components
import Icon from 'src/components/Icon'
// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
// ** Others
import { ROUTE_CONFIG } from 'src/configs/route'
import { formatNumberToLocal, isExpiry } from 'src/utils'
// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
interface TCardRelatedProduct {
  item: TProduct
}
const StyleCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  boxShadow: theme.shadows[4],
  '.MuiCardMedia-root.MuiCardMedia-media': {
    objectFit: 'contain'
  }
}))
const CardRelatedProduct = (props: TCardRelatedProduct) => {
  // ** Props
  const { item } = props
  // ** Hooks
  const { t } = useTranslation()
  const theme = useTheme()
  const router = useRouter()
  const { user } = useAuth()
  // ** Redux
  const dispatch: AppDispatch = useDispatch()
  // ** handle
  const handleNavigateDetails = (slug: string) => {
    router.push(`${ROUTE_CONFIG.PRODUCT}/${slug}`)
  }
  const memoIsExpiry = React.useMemo(() => {
    return isExpiry(item.discountStartDate, item.discountEndDate)
  }, [item])
  return (
    <StyleCard sx={{ width: '100%' }}>
      <CardMedia component='img' height='160' image={item.image} alt='image' />
      <CardContent sx={{ padding: '8px 12px 12px !important' }}>
        <Typography
          onClick={() => handleNavigateDetails(item.slug)}
          variant='h5'
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            cursor: 'pointer',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            '-webkitLineClamp': '2',
            '-webkitBoxOrient': 'vertical',
            mb: 2
          }}
        >
          {item.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {item.discount > 0 && memoIsExpiry && (
            <Typography
              variant='h6'
              sx={{
                color: theme.palette.error.main,
                fontWeight: 'bold',
                textDecoration: 'line-through',
                fontSize: '14px'
              }}
            >
              {formatNumberToLocal(item.price)} VND
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
            {item.discount > 0 && memoIsExpiry ? (
              <>{formatNumberToLocal((item.price * (100 - item.discount)) / 100)}</>
            ) : (
              <>{formatNumberToLocal(item.price)}</>
            )}{' '}
            VND
          </Typography>
          {item.discount > 0 && memoIsExpiry && (
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
        {item.countInStock > 0 ? (
          <Typography variant='body2' color='text.secondary' sx={{ my: 1 }}>
            <>{t('Count_in_stock')}</> <b>{item.countInStock}</b> <>{t('Product')}</>
          </Typography>
        ) : (
          <Box
            sx={{
              backgroundColor: hexToRGBA(theme.palette.error.main, 0.42),
              width: '60px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '2px',
              my: 1
            }}
          >
            <Typography
              variant='h6'
              sx={{
                color: theme.palette.error.main,
                fontSize: '12px',
                whiteSpace: 'nowrap'
              }}
            >
              Hết hàng
            </Typography>
          </Box>
        )}
        {item.sold > 0 ? (
          <Typography variant='body2' color='text.secondary'>
            <>{t('Sold_product')}</> <b>{item.sold}</b> <>{t('Product')}</>
          </Typography>
        ) : (
          <Typography variant='body2' color='text.secondary'>
            {t('No_sell_product')}
          </Typography>
        )}
        {item?.city?.name && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px', mt: 2 }}>
            <Icon icon='carbon:location' />
            <Typography
              variant='h6'
              sx={{
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              {item?.city?.name}
            </Typography>
          </Box>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {!!item.averageRating && (
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                <b>{item.averageRating}</b>
                <Rating
                  name='read-only'
                  sx={{ fontSize: '16px' }}
                  defaultValue={item?.averageRating}
                  precision={0.5}
                  readOnly
                />
              </Typography>
            )}
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              {!!item.totalReviews ? <b>{item.totalReviews}</b> : <span>{t('not_review')}</span>}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </StyleCard>
  )
}
export default CardRelatedProduct
