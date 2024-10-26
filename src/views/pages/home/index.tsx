// ** Next
import { NextPage } from 'next'

// ** React
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import { Box, Grid, Typography, useTheme, Tab, Tabs, TabsProps } from '@mui/material'

// ** Components
import Spinner from 'src/components/spinner'
import CustomPagination from 'src/components/custom-pagination'

import InputSearch from 'src/components/input-search'
import NoData from 'src/components/no-data'

// ** Config
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'

// ** Services
import { getAllProductTypes } from 'src/services/product-type'
import { getAllCities } from 'src/services/city'
import { getAllProductsPublic } from 'src/services/product'

// ** Utils
import { formatFilter } from 'src/utils'
import { TProduct } from 'src/types/product'
import { styled } from '@mui/material'
import FilterProduct from 'src/views/pages/product/Components/FilterProduct'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import toast from 'react-hot-toast'
import { resetInitialState } from 'src/stores/product'
import { OBJECT_TYPE_ERROR_PRODUCT } from 'src/configs/error'
import CardProduct from 'src/views/pages/product/Components/CartProduct'
import CustomSelect from 'src/components/custom-select'
import CardSkeleton from 'src/views/pages/product/Components/CardSkeleton'

type TProps = {}
const StyledTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
  '&.MuiTabs-root': {
    borderBottom: 'none'
  }
}))
const HomePage: NextPage<TProps> = () => {
  // ** Translate
  const { t } = useTranslation()
  // State
  const [sortBy, setSortBy] = useState('createdAt desc')
  const [searchBy, setSearchBy] = useState('')
  const [productTypeSelected, setProductTypeSelected] = useState('')
  const [reviewSelected, setReviewSelected] = useState('')
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setProductTypeSelected(newValue)
  }
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])
  const [page, setPage] = useState(1)
  const [optionTypes, setOptionTypes] = useState<{ label: string; value: string }[]>([])
  const [filterBy, setFilterBy] = useState<Record<string, string | string[]>>({})
  const [loading, setLoading] = useState(false)
  const [productsPublic, setProductsPublic] = useState({
    data: [],
    total: 0
  })
  const [locationSelected, setLocationSelected] = useState('')
  const [optionCities, setOptionCities] = useState<{ label: string; value: string }[]>([])

  const firstRender = useRef<boolean>(false)

  // ** Redux
  const {
    isSuccessLike,
    isErrorLike,
    isErrorUnLike,
    typeError,
    isSuccessUnLike,
    messageErrorLike,
    messageErrorUnLike,
    isLoading
  } = useSelector((state: RootState) => state.product)
  const dispatch: AppDispatch = useDispatch()

  // ** theme
  const theme = useTheme()

  // fetch api
  const handleGetListProducts = async () => {
    setLoading(true)
    const query = {
      params: { limit: pageSize, page: page, search: searchBy, order: sortBy, ...formatFilter(filterBy) }
    }
    await getAllProductsPublic(query).then((res: any) => {
      if (res?.data) {
        setLoading(false)
        setProductsPublic({
          data: res?.data,
          total: res?.totalCount
        })
      }
    })
  }
  const handleOnchangePagination = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  const handleFilterProduct = (value: string, type: string) => {
    switch (type) {
      case 'review': {
        setReviewSelected(value)
        break
      }
      case 'location': {
        setLocationSelected(value)
        break
      }
    }
  }
  const handleResetFilter = () => {
    setLocationSelected('')
    setReviewSelected('')
  }
  // ** fetch api
  const fetchAllTypes = async () => {
    setLoading(true)
    await getAllProductTypes({ params: { limit: -1, page: -1 } })
      .then(res => {
        const data = res?.data
        if (data) {
          setOptionTypes(data?.map((item: { name: string; id: string }) => ({ label: item.name, value: item.id })))
          setProductTypeSelected(data?.[0]?.id)
          firstRender.current = true
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

  useEffect(() => {
    fetchAllTypes()
    fetchAllCities()
  }, [])

  useEffect(() => {
    if (firstRender.current) {
      handleGetListProducts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, searchBy, page, pageSize, filterBy])

  useEffect(() => {
    if (firstRender.current) {
      setFilterBy({ productType: productTypeSelected, minStar: reviewSelected, productLocation: locationSelected })
    }
  }, [productTypeSelected, reviewSelected, locationSelected])

  useEffect(() => {
    if (isSuccessLike) {
      toast.success(t('Like_product_success'))
      handleGetListProducts()
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
      handleGetListProducts()
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

  return (
    <>
      {loading && <Spinner />}
      <Box
        sx={{
          height: '100%',
          width: '100%'
        }}
      >
        <StyledTabs value={productTypeSelected} onChange={handleChange} aria-label='wrapped label tabs example'>
          {optionTypes.map(opt => {
            return <Tab key={opt.value} value={opt.value} label={opt.label} />
          })}
        </StyledTabs>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Box sx={{ width: '300px' }}>
              <CustomSelect
                fullWidth
                onChange={e => {
                  setSortBy(e.target.value as string)
                }}
                value={sortBy}
                options={[
                  {
                    label: t('Sort_best_sold'),
                    value: 'sold desc'
                  },
                  {
                    label: t('Sort_new_create'),
                    value: 'createdAt desc'
                  }
                ]}
                placeholder={t('Sort_by')}
              />
            </Box>
            <Box sx={{ width: '300px' }}>
              <InputSearch
                placeholder={t('Search_name_product')}
                value={searchBy}
                onChange={(value: string) => setSearchBy(value)}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            mt: 4,
            mb: 8
          }}
        >
          <Grid
            container
            spacing={{
              md: 6,
              xs: 4
            }}
          >
            <Grid item md={3} display={{ md: 'flex', xs: 'none' }}>
              <Box sx={{ width: '100%' }}>
                <FilterProduct
                  locationSelected={locationSelected}
                  reviewSelected={reviewSelected}
                  handleReset={handleResetFilter}
                  optionCities={optionCities}
                  handleFilterProduct={handleFilterProduct}
                />
              </Box>
            </Grid>
            <Grid item md={9} xs={12}>
              {loading ? (
                <Grid
                  container
                  spacing={{
                    md: 6,
                    xs: 4
                  }}
                >
                  {Array.from({ length: 6 }).map((_, index) => {
                    return (
                      <Grid item key={index} md={4} sm={6} xs={12}>
                        <CardSkeleton />
                      </Grid>
                    )
                  })}
                </Grid>
              ) : (
                <Grid
                  container
                  spacing={{
                    md: 6,
                    xs: 4
                  }}
                >
                  {productsPublic?.data?.length > 0 ? (
                    <>
                      {productsPublic?.data?.map((item: TProduct) => {
                        return (
                          <Grid item key={item.id} md={4} sm={6} xs={12}>
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
            </Grid>
          </Grid>
        </Box>
        <Box>
          <CustomPagination
            onChangePagination={handleOnchangePagination}
            pageSizeOptions={PAGE_SIZE_OPTION}
            pageSize={pageSize}
            page={page}
            rowLength={productsPublic.total}
            isHideShowed
          />
        </Box>
      </Box>
    </>
  )
}
export default HomePage
