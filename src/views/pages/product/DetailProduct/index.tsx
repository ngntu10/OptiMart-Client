// ** Next
import { NextPage } from 'next'

// ** React
import { useEffect, useState } from 'react'

// ** Mui
import { Box, Button, Grid, Rating, Typography, useTheme } from '@mui/material'

// ** Components
import Icon from 'src/components/Icon'

// ** Images
import defaultProduct from '/public/images/default-product.png'

// ** Translate
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'

// ** Utils
import { convertBase64, formatNumberToLocal, separationFullName, toFullName } from 'src/utils'

// ** Other
import Spinner from 'src/components/spinner'
import { getDetailsProductPublicBySlug } from 'src/services/product'
import { useRouter } from 'next/router'
import { TProduct } from 'src/types/product'
import Image from 'next/image'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
type TProps = {}
const DetailsProductPage: NextPage<TProps> = () => {
  // State
  const [loading, setLoading] = useState(false)
  const [dataProduct, setDataProduct] = useState<TProduct | any>({})
  const router = useRouter()
  const productId = router.query?.productId as string

  // ** Hooks
  const { i18n } = useTranslation()

  // ** theme
  const theme = useTheme()

  // fetch api
  const fetchGetDetailsProduct = async (slug: string) => {
    setLoading(true)
    await getDetailsProductPublicBySlug(slug)
      .then(async response => {
        setLoading(false)
        const data = response?.data
        if (data) {
          setDataProduct(data)
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    if (productId) {
      fetchGetDetailsProduct(productId)
    }
  }, [productId])
  return (
    <>
      {loading && <Spinner />}
      <Grid container>
        <Grid
          container
          item
          md={12}
          xs={12}
          sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4 }}
        >
          <Box sx={{ height: '100%', width: '100%' }}>
            <Grid container spacing={8}>
              <Grid item md={5} xs={12}>
                <Image
                  src={dataProduct?.image || defaultProduct}
                  alt='banner'
                  width={50000}
                  height={50000}
                  style={{
                    height: '80%',
                    width: '100%',
                    objectFit: 'contain',
                    borderRadius: '15px'
                  }}
                />
              </Grid>
              <Grid item md={7} xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography
                    variant='h5'
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 'bold',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      '-webkitLineClamp': '2',
                      '-webkitBoxOrient': 'vertical'
                    }}
                  >
                    {dataProduct.name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                  {dataProduct?.averageRating && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        variant='h5'
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 'bold',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          '-webkitLineClamp': '2',
                          '-webkitBoxOrient': 'vertical',
                          textDecoration: 'underline',
                          fontSize: '16px'
                        }}
                      >
                        {dataProduct.averageRating}
                      </Typography>
                      <Rating
                        name='read-only'
                        sx={{ fontSize: '16px' }}
                        defaultValue={dataProduct?.averageRating}
                        precision={0.5}
                        readOnly
                      />
                    </Box>
                  )}
                  <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                    {!!dataProduct.totalReviews ? (
                      <span>
                        <b>{dataProduct.totalReviews}</b>
                        {t('Review')}
                      </span>
                    ) : (
                      <span>{t('not_review')}</span>
                    )}
                  </Typography>
                  {dataProduct.sold && (
                    <Typography variant='body2' color='text.secondary'>
                      <>{t('Sold_product', { count: dataProduct.countInStock })}</>
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mt: 2,
                    backgroundColor: theme.palette.customColors.bodyBg,
                    padding: '8px',
                    borderRadius: '8px'
                  }}
                >
                  {dataProduct.discount > 0 && (
                    <Typography
                      variant='h6'
                      sx={{
                        color: theme.palette.error.main,
                        fontWeight: 'bold',
                        textDecoration: 'line-through',
                        fontSize: '18px'
                      }}
                    >
                      {formatNumberToLocal(dataProduct.price)} VND
                    </Typography>
                  )}
                  <Typography
                    variant='h4'
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 'bold',
                      fontSize: '24px'
                    }}
                  >
                    {dataProduct.discount > 0 ? (
                      <>{formatNumberToLocal((dataProduct.price * (100 - dataProduct.discount)) / 100)}</>
                    ) : (
                      <>{formatNumberToLocal(dataProduct.price)}</>
                    )}{' '}
                    VND
                  </Typography>
                  {dataProduct.discount > 0 && (
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
                        - {dataProduct.discount} %
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 12px 10px',
                    gap: 6,
                    mt: 8
                  }}
                >
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
                    <Icon icon='bx:cart' fontSize={24} style={{ position: 'relative', top: '-2px' }} />
                    {t('Add_to_cart')}
                  </Button>
                  <Button
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
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          container
          item
          md={12}
          xs={12}
          sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4, mt: 6 }}
        >
          <Box sx={{ height: '100%', width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mt: 2,
                backgroundColor: theme.palette.customColors.bodyBg,
                padding: '8px',
                borderRadius: '8px'
              }}
            >
              <Typography
                variant='h6'
                sx={{
                  color: `rgba(${theme.palette.customColors.main}, 0.68)`,
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}
              >
                {t('Description_product')}
              </Typography>
            </Box>
            <Box sx={{ mt: 4 }} dangerouslySetInnerHTML={{ __html: dataProduct.description }} />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
export default DetailsProductPage
