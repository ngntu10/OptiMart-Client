// ** Next
import { NextPage } from 'next'
// ** React
import { useEffect, useState } from 'react'
// ** Mui
import { Box, Grid, Tab, Tabs, TabsProps, styled, useTheme } from '@mui/material'
// ** Translate
import { useTranslation } from 'react-i18next'
// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { getAllProductsLikedAsync, getAllProductsViewedAsync } from 'src/stores/product/actions'
import { resetInitialState } from 'src/stores/product'
// ** component
import InputSearch from 'src/components/input-search'
import Spinner from 'src/components/spinner'
import CustomPagination from 'src/components/custom-pagination'
import NoData from 'src/components/no-data'
// ** Other
import toast from 'react-hot-toast'
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'
import { OBJECT_TYPE_ERROR_PRODUCT } from 'src/configs/error'
// ** Types
import { TProduct } from 'src/types/product'
import CardProduct from '../product/Components/CartProduct'
import CardSkeleton from 'src/views/pages/product/Components/CardSkeleton'

type TProps = {}
const StyledTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
  '&.MuiTabs-root': {
    borderBottom: 'none'
  }
}))
const TYPE_VALUE = {
  liked: '1',
  viewed: '2'
}
const MyProductPage: NextPage<TProps> = () => {
  // ** Hooks
  const { i18n, t } = useTranslation()
  // State
  const [loading, setLoading] = useState(false)
  const [searchBy, setSearchBy] = useState('')
  const [tabActive, setTabActive] = useState(TYPE_VALUE.viewed)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])
  const [page, setPage] = useState(1)
  const [optionTypes, setOptionTypes] = useState([
    {
      label: t('Product_viewed'),
      value: TYPE_VALUE.viewed
    },
    {
      label: t('Product_liked'),
      value: TYPE_VALUE.liked
    }
  ])
  // ** theme
  const theme = useTheme()
  // ** redux
  const dispatch: AppDispatch = useDispatch()
  const {
    isLoading,
    likedProducts,
    viewedProducts,
    isSuccessUnLike,
    isSuccessLike,
    isErrorLike,
    isErrorUnLike,
    messageErrorLike,
    messageErrorUnLike,
    typeError
  } = useSelector((state: RootState) => state.product)
  // ** Fetch api
  const handleGetListProductViewed = () => {
    const query = {
      params: { limit: pageSize, page: page, search: searchBy }
    }
    dispatch(getAllProductsViewedAsync(query))
  }
  const handleGetListProductLiked = () => {
    const query = {
      params: { limit: pageSize, page: page, search: searchBy }
    }
    dispatch(getAllProductsLikedAsync(query))
  }
  // ** Handle
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabActive(newValue)
    setPage(1)
    setPageSize(PAGE_SIZE_OPTION[0])
    setSearchBy('')
  }
  const handleOnchangePagination = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }
  const handleGetListData = () => {
    if (tabActive === TYPE_VALUE.liked) {
      handleGetListProductLiked()
    } else {
      handleGetListProductViewed()
    }
  }
  useEffect(() => {
    if (isSuccessLike) {
      toast.success(t('Like_product_success'))
      handleGetListData()
      dispatch(resetInitialState())
    } else if (isErrorLike && messageErrorLike && typeError) {
      const errorConfig = OBJECT_TYPE_ERROR_PRODUCT[typeError]
      if (errorConfig) {
        toast.error(t(errorConfig))
      } else {
        toast.error(t('Like_product_error'))
      }
      dispatch(resetInitialState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessLike, isErrorLike, messageErrorLike, typeError])
  useEffect(() => {
    if (isSuccessUnLike) {
      toast.success(t('Unlike_product_success'))
      dispatch(resetInitialState())
      handleGetListData()
    } else if (isErrorUnLike && messageErrorUnLike && typeError) {
      const errorConfig = OBJECT_TYPE_ERROR_PRODUCT[typeError]
      if (errorConfig) {
        toast.error(t(errorConfig))
      } else {
        toast.error(t('Unlike_product_error'))
      }
      dispatch(resetInitialState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessUnLike, isErrorUnLike, messageErrorUnLike, typeError])
  useEffect(() => {
    handleGetListData()
  }, [searchBy, tabActive])
  return (
    <>
      {loading || (isLoading && <Spinner />)}
      <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4 }}>
        <Grid container item md={12} xs={12}>
          <StyledTabs value={tabActive} onChange={handleChange} aria-label='wrappe'>
            {optionTypes.map(opt => {
              return <Tab key={opt.value} value={opt.value} label={opt.label} />
            })}
          </StyledTabs>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, width: '100%' }}>
            <Box sx={{ width: '300px' }}>
              <InputSearch
                placeholder={t('Search_name_product')}
                value={searchBy}
                onChange={(value: string) => setSearchBy(value)}
              />
            </Box>
          </Box>
          {tabActive === TYPE_VALUE.liked && (
            <Box sx={{ height: '100%', width: '100%', mt: 6 }}>
              {isLoading ? (
                <Grid container md={12} xs={12} spacing={6}>
                  {Array.from({ length: 6 }).map((_, index) => {
                    return (
                      <Grid item key={index} md={3} sm={6} xs={12}>
                        <CardSkeleton />
                      </Grid>
                    )
                  })}
                </Grid>
              ) : (
                <Grid container md={12} xs={12} spacing={6}>
                  {likedProducts?.data?.length > 0 ? (
                    <>
                      {likedProducts?.data?.map((item: TProduct) => {
                        return (
                          <Grid item key={item.id} md={3} sm={6} xs={12}>
                            <CardProduct item={item} />
                          </Grid>
                        )
                      })}
                    </>
                  ) : (
                    <Box sx={{ width: '100%', mt: 10 }}>
                      <NoData widthImage='60px' heightImage='60px' textNodata={t('No_product')} />
                    </Box>
                  )}
                </Grid>
              )}
            </Box>
          )}
          {tabActive === TYPE_VALUE.viewed && (
            <Box sx={{ height: '100%', width: '100%', mt: 6 }}>
              {isLoading ? (
                <Grid container md={12} xs={12} spacing={6}>
                  {Array.from({ length: 6 }).map((_, index) => {
                    return (
                      <Grid item key={index} md={3} sm={6} xs={12}>
                        <CardSkeleton />
                      </Grid>
                    )
                  })}
                </Grid>
              ) : (
                <Grid container md={12} xs={12} spacing={6}>
                  {viewedProducts?.data?.length > 0 ? (
                    <>
                      {viewedProducts?.data?.map((item: TProduct) => {
                        return (
                          <Grid item key={item.id} md={3} sm={6} xs={12}>
                            <CardProduct item={item} />
                          </Grid>
                        )
                      })}
                    </>
                  ) : (
                    <Box sx={{ width: '100%', mt: 10 }}>
                      <NoData widthImage='60px' heightImage='60px' textNodata={t('No_product')} />
                    </Box>
                  )}
                </Grid>
              )}
            </Box>
          )}
        </Grid>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: 6 }}>
          <CustomPagination
            onChangePagination={handleOnchangePagination}
            pageSizeOptions={PAGE_SIZE_OPTION}
            pageSize={pageSize}
            page={page}
            rowLength={tabActive === TYPE_VALUE.liked ? likedProducts.total : viewedProducts.total}
            isHideShowed
          />
        </Box>
      </Box>
    </>
  )
}
export default MyProductPage
