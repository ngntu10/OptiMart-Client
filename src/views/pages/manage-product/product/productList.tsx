// ** Next
import { NextPage } from 'next'

// ** React
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import { Box, Chip, ChipProps, Grid, Typography, styled, useTheme } from '@mui/material'
import { GridColDef, GridRowSelectionModel, GridSortModel } from '@mui/x-data-grid'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { resetInitialState } from 'src/stores/product'
import {
  changeProductImageAsync,
  deleteMultipleProductAsync,
  deleteProductAsync,
  getAllProductsAsync
} from 'src/stores/product/actions'

// ** Components
import GridDelete from 'src/components/grid-delete'
import GridEdit from 'src/components/grid-edit'
import GridCreate from 'src/components/grid-create'
import InputSearch from 'src/components/input-search'
import CustomDataGrid from 'src/components/custom-data-grid'
import Spinner from 'src/components/spinner'
import ConfirmationDialog from 'src/components/confirmation-dialog'
import CustomPagination from 'src/components/custom-pagination'
import TableHeader from 'src/components/table-header'

// ** Others
import toast from 'react-hot-toast'
import { OBJECT_TYPE_ERROR_PRODUCT } from 'src/configs/error'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
import CustomSelect from 'src/components/custom-select'

// ** Hooks
import { usePermission } from 'src/hooks/usePermission'

// ** Config
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'
import { OBJECT_STATUS_PRODUCT } from 'src/configs/product'

// ** Services
import { getAllProductTypes } from 'src/services/product-type'

// ** Utils
import { formatNumberToLocal,formatFilter } from 'src/utils'
import {formatDate} from "src/utils/date"
import CreateEditProduct from './Components/CreateEditProduct'

const ActiveUserStyled = styled(Chip)<ChipProps>(({ theme }) => ({
  backgroundColor: '#28c76f29',
  color: '#3a843f',
  fontSize: '14px',
  padding: '8px 4px',
  fontWeight: 400
}))
const DeactivateUserStyled = styled(Chip)<ChipProps>(({ theme }) => ({
  backgroundColor: '#da251d29',
  color: '#da251d',
  fontSize: '14px',
  padding: '8px 4px',
  fontWeight: 400
}))

type TProps = {}
const ProductListPage: NextPage<TProps> = () => {
  // ** Translate
  const { t } = useTranslation()
  // State
  const [openCreateEdit, setOpenCreateEdit] = useState({
    open: false,
    id: ''
  })
  const [openDeleteProduct, setOpenDeleteProduct] = useState({
    open: false,
    id: ''
  })
  const [openDeleteMultipleProduct, setOpenDeleteMultipleProduct] = useState(false)
  const [sortBy, setSortBy] = useState('createdAt desc')
  const [searchBy, setSearchBy] = useState('')
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])
  const [page, setPage] = useState(1)
  const [selectedRow, setSelectedRow] = useState<string[]>([])
  const [optionTypes, setOptionTypes] = useState<{ label: string; value: string }[]>([])
  const [typeSelected, setTypeSelected] = useState<string[]>([])
  const [statusSelected, setStatusSelected] = useState<string[]>([])
  const [filterBy, setFilterBy] = useState<Record<string, string | string[]>>({})
  const [loading, setLoading] = useState(false)
  const CONSTANT_STATUS_PRODUCT = OBJECT_STATUS_PRODUCT()

  // ** Hooks
  const { VIEW, UPDATE, DELETE, CREATE } = usePermission('MANAGE_PRODUCT.PRODUCT', [
    'CREATE',
    'VIEW',
    'UPDATE',
    'DELETE'
  ])

  /// ** redux
  const dispatch: AppDispatch = useDispatch()
  const {
    products,
    isSuccessCreateEdit,
    isErrorCreateEdit,
    isLoading,
    messageErrorCreateEdit,
    isErrorDelete,
    isSuccessDelete,
    messageErrorDelete,
    typeError,
    isSuccessMultipleDelete,
    isErrorMultipleDelete,
    messageErrorMultipleDelete
  } = useSelector((state: RootState) => state.product)

  // ** theme
  const theme = useTheme()

  // fetch api
  const handleGetListProducts = () => {
    const query = {
      params: { limit: pageSize, page: page, search: searchBy, order: sortBy, ...formatFilter(filterBy) }
    }
    dispatch(getAllProductsAsync(query))
  }

  // handle
  const handleCloseConfirmDeleteProduct = () => {
    setOpenDeleteProduct({
      open: false,
      id: ''
    })
  }
  const handleCloseConfirmDeleteMultipleProduct = () => {
    setOpenDeleteMultipleProduct(false)
  }
  const handleSort = (sort: GridSortModel) => {
    const sortOption = sort[0]
    if (sortOption) {
      setSortBy(`${sortOption.field} ${sortOption.sort}`)
    } else {
      setSortBy('createdAt desc')
    }
  }
  const handleCloseCreateEdit = () => {
    setOpenCreateEdit({
      open: false,
      id: ''
    })
  }
  const handleDeleteProduct = () => {
    dispatch(deleteProductAsync(openDeleteProduct.id))
  }
  const handleDeleteMultipleProduct = () => {
    dispatch(
      deleteMultipleProductAsync({
        productIds: selectedRow
      })
    )
  }
  const handleAction = (action: string) => {
    switch (action) {
      case 'delete': {
        setOpenDeleteMultipleProduct(true)
        break
      }
    }
  }
  const handleOnchangePagination = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  // ** fetch api
  const fetchAllTypes = async () => {
    setLoading(true)
    await getAllProductTypes({ params: { limit: -1, page: -1 } })
      .then(res => {
        const data = res?.data
        if (data) {
          setOptionTypes(data?.map((item: { name: string; id: string }) => ({ label: item.name, value: item.id })))
        }
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
      })
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: t('Name'),
      flex: 1,
      minWidth: 200,
      renderCell: params => {
        const { row } = params
        return <Typography>{row?.name}</Typography>
      }
    },
    {
      field: 'type',
      headerName: t('type'),
      minWidth: 200,
      maxWidth: 200,
      renderCell: params => {
        const { row } = params
        return <Typography>{row?.productType?.name}</Typography>
      }
    },
    {
      field: 'price',
      headerName: t('Price'),
      minWidth: 200,
      maxWidth: 200,
      renderCell: params => {
        const { row } = params
        return <Typography>{`${formatNumberToLocal(row?.price)} VND`}</Typography>
      }
    },
    {
      field: 'countInStock',
      headerName: t('Count_in_stock'),
      minWidth: 200,
      maxWidth: 200,
      renderCell: params => {
        const { row } = params
        return <Typography>{row?.countInStock}</Typography>
      }
    },
    {
      field: 'createdAt',
      headerName: t('Created_date'),
      minWidth: 180,
      maxWidth: 180,
      renderCell: params => {
        const { row } = params
        return <Typography>{formatDate(row?.createdAt, { dateStyle: 'medium' })}</Typography>
      }
    },
    {
      field: 'status',
      headerName: t('Status'),
      minWidth: 180,
      maxWidth: 180,
      renderCell: params => {
        const { row } = params
        return (
          <>{row.status ? <ActiveUserStyled label={t('Public')} /> : <DeactivateUserStyled label={t('Private')} />}</>
        )
      }
    },
    {
      field: 'action',
      headerName: t('Actions'),
      minWidth: 150,
      sortable: false,
      align: 'left',
      renderCell: params => {
        const { row } = params
        return (
          <>
            <GridEdit
              disabled={!UPDATE}
              onClick={() =>
                setOpenCreateEdit({
                  open: true,
                  id: String(params.id)
                })
              }
            />
            <GridDelete
              disabled={!DELETE}
              onClick={() =>
                setOpenDeleteProduct({
                  open: true,
                  id: String(params.id)
                })
              }
            />
          </>
        )
      }
    }
  ]
  const PaginationComponent = () => {
    return (
      <CustomPagination
        onChangePagination={handleOnchangePagination}
        pageSizeOptions={PAGE_SIZE_OPTION}
        pageSize={pageSize}
        page={page}
        rowLength={products.total}
      />
    )
  }
  useEffect(() => {
    handleGetListProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, searchBy, page, pageSize, filterBy])
  useEffect(() => {
    if (isSuccessCreateEdit) {
      if (!openCreateEdit.id) {
        toast.success(t('Create_product_success'))
      } else {
        toast.success(t('Update_product_success'))
      }
      handleGetListProducts()
      handleCloseCreateEdit()
      dispatch(resetInitialState())
    } else if (isErrorCreateEdit && messageErrorCreateEdit && typeError) {
      const errorConfig = OBJECT_TYPE_ERROR_PRODUCT[typeError]
      if (errorConfig) {
        toast.error(t(errorConfig))
      } else {
        if (openCreateEdit.id) {
          toast.error(t('Update_product_error'))
        } else {
          toast.error(t('Create_product_error'))
        }
      }
      dispatch(resetInitialState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessCreateEdit, isErrorCreateEdit, messageErrorCreateEdit, typeError])
  useEffect(() => {
    if (isSuccessMultipleDelete) {
      toast.success(t('Delete_multiple_product_success'))
      handleGetListProducts()
      dispatch(resetInitialState())
      handleCloseConfirmDeleteMultipleProduct()
      setSelectedRow([])
    } else if (isErrorMultipleDelete && messageErrorMultipleDelete) {
      toast.error(t('Delete_multiple_product_error'))
      dispatch(resetInitialState())
    }
  }, [isSuccessMultipleDelete, isErrorMultipleDelete, messageErrorMultipleDelete])
  useEffect(() => {
    if (isSuccessDelete) {
      toast.success(t('Delete_product_success'))
      handleGetListProducts()
      dispatch(resetInitialState())
      handleCloseConfirmDeleteProduct()
    } else if (isErrorDelete && messageErrorDelete) {
      toast.error(t('Delete_product_error'))
      dispatch(resetInitialState())
    }
  }, [isSuccessDelete, isErrorDelete, messageErrorDelete])

  useEffect(() => {
    setFilterBy({ productType: typeSelected, status: statusSelected })
  }, [typeSelected, statusSelected])
  useEffect(() => {
    fetchAllTypes()
  }, [])

  return (
    <>
      {loading && <Spinner />}
      <ConfirmationDialog
        open={openDeleteProduct.open}
        handleClose={handleCloseConfirmDeleteProduct}
        handleCancel={handleCloseConfirmDeleteProduct}
        handleConfirm={handleDeleteProduct}
        title={t('Title_delete_product')}
        description={t('Confirm_delete_product')}
      />
      <ConfirmationDialog
        open={openDeleteMultipleProduct}
        handleClose={handleCloseConfirmDeleteMultipleProduct}
        handleCancel={handleCloseConfirmDeleteMultipleProduct}
        handleConfirm={handleDeleteMultipleProduct}
        title={t('Title_delete_multiple_product')}
        description={t('Confirm_delete_multiple_product')}
      />
      <CreateEditProduct open={openCreateEdit.open} onClose={handleCloseCreateEdit} idProduct={openCreateEdit.id} />
      {isLoading && <Spinner />}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          padding: '20px',
          height: '100%',
          width: '100%'
        }}
      >
        <Grid container sx={{ height: '100%', width: '100%' }}>
          {!selectedRow?.length && (
            <Box
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, mb: 4, width: '100%' }}
            >
              <Box sx={{ width: '200px' }}>
                <CustomSelect
                  fullWidth
                  onChange={e => {
                    setTypeSelected(e.target.value as string[])
                  }}
                  multiple
                  options={optionTypes}
                  value={typeSelected}
                  placeholder={t('Type_product')}
                />
              </Box>
              <Box sx={{ width: '200px' }}>
                <CustomSelect
                  fullWidth
                  onChange={e => {
                    setStatusSelected(e.target.value as string[])
                  }}
                  multiple
                  options={Object.values(CONSTANT_STATUS_PRODUCT)}
                  value={statusSelected}
                  placeholder={t('Status')}
                />
              </Box>
              <Box sx={{ width: '200px' }}>
                <InputSearch value={searchBy} onChange={(value: string) => setSearchBy(value)} />
              </Box>
              <GridCreate
                disabled={!CREATE}
                onClick={() => {
                  setOpenCreateEdit({
                    open: true,
                    id: ''
                  })
                }}
              />
            </Box>
          )}
          {selectedRow?.length > 0 && (
            <TableHeader
              numRow={selectedRow?.length}
              onClear={() => setSelectedRow([])}
              handleAction={handleAction}
              actions={[{ label: t('Xóa'), value: 'delete', disabled: !DELETE }]}
            />
          )}
          <CustomDataGrid
            rows={products.data}
            columns={columns}
            autoHeight
            sx={{
              '.row-selected': {
                backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.08)} !important`,
                color: `${theme.palette.primary.main} !important`
              }
            }}
            checkboxSelection
            sortingOrder={['desc', 'asc']}
            sortingMode='server'
            onSortModelChange={handleSort}
            getRowId={row => row.id}
            disableRowSelectionOnClick
            slots={{
              pagination: PaginationComponent
            }}
            rowSelectionModel={selectedRow}
            onRowSelectionModelChange={(row: GridRowSelectionModel) => {
              setSelectedRow(row as string[])
            }}
            disableColumnFilter
            disableColumnMenu
          />
        </Grid>
      </Box>
    </>
  )
}
export default ProductListPage
