// ** Next
import { NextPage } from 'next'
// ** React
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// ** Mui
import { Box, Grid, Typography, useTheme, Tab, Tabs, TabsProps } from '@mui/material'
// ** Redux
// ** Components
import Spinner from 'src/components/spinner'
import CustomPagination from 'src/components/custom-pagination'
// ** Others
// ** Config
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'
// ** Services
import { getAllProductTypes } from 'src/services/product-type'
// ** Utils
import { formatFilter } from 'src/utils'
import { getAllProductsPublic } from 'src/services/product'
import { TProduct } from 'src/types/product'
import InputSearch from 'src/components/input-search'
import { styled } from '@mui/material'
import FilterProduct from 'src/views/pages/home/Components/FilterProduct'
import CardProduct from './Components/CartProduct'
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
  // ** theme
  const theme = useTheme()
  // fetch api
  const handleGetListProducts = async () => {
    setLoading(true)
    const query = {
      params: { limit: pageSize, page: page, search: searchBy, order: sortBy, ...formatFilter(filterBy) }
    }
    await getAllProductsPublic(query).then((res:any) => {
      if (res?.data) {
        setLoading(false)
        setProductsPublic({
          data: res?.data?.products,
          total: res?.data?.totalCount
        })
      }
    })
  }
  const handleOnchangePagination = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }
  const handleFilterProduct = (review: string) => {
    setReviewSelected(review)
  }
  // ** fetch api
  const fetchAllTypes = async () => {
    setLoading(true)
    await getAllProductTypes({ params: { limit: -1, page: -1 } })
      .then(res => {
        const data = res?.data.productTypes
        if (data) {
          setOptionTypes(data?.map((item: { name: string; id: string }) => ({ label: item.name, value: item.id })))
          setProductTypeSelected(data?.[0]?.id)
        }
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
      })
  }
  useEffect(() => {
    handleGetListProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, searchBy, page, pageSize, filterBy])
  useEffect(() => {
    setFilterBy({ productType: productTypeSelected, minStar: reviewSelected })
  }, [productTypeSelected, reviewSelected])
  useEffect(() => {
    fetchAllTypes()
  }, [])
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
          <Box sx={{ width: '300px' }}>
            <InputSearch value={searchBy} onChange={(value: string) => setSearchBy(value)} />
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
                <FilterProduct handleFilterProduct={handleFilterProduct} />
              </Box>
            </Grid>
            <Grid item md={9} xs={12}>
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
                  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Typography>Không có dữ liệu</Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <CustomPagination
          onChangePagination={handleOnchangePagination}
          pageSizeOptions={PAGE_SIZE_OPTION}
          pageSize={pageSize}
          page={page}
          rowLength={10}
          isHideShowed
        />
      </Box>
    </>
  )
}
export default HomePage
