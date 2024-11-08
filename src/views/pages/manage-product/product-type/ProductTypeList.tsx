// ** Next
import { NextPage } from 'next'

// ** React
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import { Box, Grid, Typography, useTheme } from '@mui/material'
import { GridColDef, GridRowSelectionModel, GridSortModel } from '@mui/x-data-grid'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { resetInitialState } from 'src/stores/product-type'
import {
  deleteMultipleProductTypeAsync,
  deleteProductTypeAsync,
  getAllProductTypesAsync
} from 'src/stores/product-type/actions'

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
import { hexToRGBA } from 'src/utils/hex-to-rgba'

// ** Hooks
import { usePermission } from 'src/hooks/usePermission'

// ** Config
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'

// ** Utils
import { formatDate } from 'src/utils/date'
import CreateEditProductType from '../Components/CreateEditProductType'

type TProps = {}

const ProductTypeListPage: NextPage<TProps> = () => {
  // ** Translate
  const { t } = useTranslation()

  // State

  const [openCreateEdit, setOpenCreateEdit] = useState({
    open: false,
    id: ''
  })
  const [openDeleteProductType, setOpenDeleteProductType] = useState({
    open: false,
    id: ''
  })
  const [openDeleteMultipleProduct, setOpenDeleteMultipleProduct] = useState(false)
  const [sortBy, setSortBy] = useState('createdAt desc')
  const [searchBy, setSearchBy] = useState('')

  const [loading, setLoading] = useState(false)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])
  const [page, setPage] = useState(1)
  const [selectedRow, setSelectedRow] = useState<string[]>([])

  // ** Hooks
  const { VIEW, UPDATE, DELETE, CREATE } = usePermission('MANAGE_PRODUCT.PRODUCT_TYPE', [
    'CREATE',
    'VIEW',
    'UPDATE',
    'DELETE'
  ])

  /// ** redux
  const dispatch: AppDispatch = useDispatch()
  const {
    productTypes,
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
  } = useSelector((state: RootState) => state.productType)

  // ** theme
  const theme = useTheme()

  // fetch api
  const handleGetListProductTypes = () => {
    const query = { params: { limit: pageSize, page: page, search: searchBy, order: sortBy } }
    dispatch(getAllProductTypesAsync(query))
  }

  // handle
  const handleCloseConfirmDeleteProductType = () => {
    setOpenDeleteProductType({
      open: false,
      id: ''
    })
  }

  const handleCloseConfirmDeleteMultipleProductType = () => {
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

  const handleDeleteProductType = () => {
    dispatch(deleteProductTypeAsync(openDeleteProductType.id))
  }

  const handleDeleteMultipleProductType = () => {
    dispatch(
      deleteMultipleProductTypeAsync({
        productTypeIds: selectedRow
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
      field: 'slug',
      headerName: t('Slug'),
      minWidth: 200,
      maxWidth: 200,
      renderCell: params => {
        const { row } = params

        return <Typography>{row?.slug}</Typography>
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
                setOpenDeleteProductType({
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
        rowLength={productTypes.total}
      />
    )
  }

  useEffect(() => {
    handleGetListProductTypes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, searchBy, page, pageSize])

  useEffect(() => {
    if (isSuccessCreateEdit) {
      if (!openCreateEdit.id) {
        toast.success(t('Create_product_type_success'))
      } else {
        toast.success(t('Update_product_type_success'))
      }
      handleGetListProductTypes()
      handleCloseCreateEdit()
      dispatch(resetInitialState())
    } else if (isErrorCreateEdit && messageErrorCreateEdit && typeError) {
      {
        if (openCreateEdit.id) {
          toast.error(t('Update_product_type_error'))
        } else {
          toast.error(t('Create_product_type_error'))
        }
      }
      dispatch(resetInitialState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessCreateEdit, isErrorCreateEdit, messageErrorCreateEdit, typeError])

  useEffect(() => {
    if (isSuccessMultipleDelete) {
      toast.success(t('Delete_multiple_product_type_success'))
      handleGetListProductTypes()
      dispatch(resetInitialState())
      handleCloseConfirmDeleteMultipleProductType()
      setSelectedRow([])
    } else if (isErrorMultipleDelete && messageErrorMultipleDelete) {
      toast.error(t('Delete_multiple_product_type_error'))
      dispatch(resetInitialState())
    }
  }, [isSuccessMultipleDelete, isErrorMultipleDelete, messageErrorMultipleDelete])

  useEffect(() => {
    if (isSuccessDelete) {
      toast.success(t('Delete_product_type_success'))
      handleGetListProductTypes()
      dispatch(resetInitialState())
      handleCloseConfirmDeleteProductType()
    } else if (isErrorDelete && messageErrorDelete) {
      toast.error(t('Delete_product_type_error'))
      dispatch(resetInitialState())
    }
  }, [isSuccessDelete, isErrorDelete, messageErrorDelete])

  return (
    <>
      {loading && <Spinner />}
      <ConfirmationDialog
        open={openDeleteProductType.open}
        handleClose={handleCloseConfirmDeleteProductType}
        handleCancel={handleCloseConfirmDeleteProductType}
        handleConfirm={handleDeleteProductType}
        title={t('Title_delete_product_type')}
        description={t('Confirm_delete_product_type')}
      />
      <ConfirmationDialog
        open={openDeleteMultipleProduct}
        handleClose={handleCloseConfirmDeleteMultipleProductType}
        handleCancel={handleCloseConfirmDeleteMultipleProductType}
        handleConfirm={handleDeleteMultipleProductType}
        title={t('Title_delete_multiple_product_type')}
        description={t('Confirm_delete_multiple_product_type')}
      />
      <CreateEditProductType
        open={openCreateEdit.open}
        onClose={handleCloseCreateEdit}
        idProductType={openCreateEdit.id}
      />
      {isLoading && <Spinner />}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          padding: '20px',
          height: '100%',
          width: '100%',
          borderRadius: '15px'
        }}
      >
        <Grid container sx={{ height: '100%', width: '100%' }}>
          {!selectedRow?.length && (
            <Box
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, mb: 4, width: '100%' }}
            >
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
            rows={productTypes.data}
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

export default ProductTypeListPage
