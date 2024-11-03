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
import { deleteMultipleReviewAsync, deleteReviewAsync, getAllReviewAsync } from 'src/stores/reviews/actions'
import { resetInitialState } from 'src/stores/reviews'
// ** Components
import GridDelete from 'src/components/grid-delete'
import GridEdit from 'src/components/grid-edit'
import InputSearch from 'src/components/input-search'
import CustomDataGrid from 'src/components/custom-data-grid'
import Spinner from 'src/components/spinner'
import ConfirmationDialog from 'src/components/confirmation-dialog'
import CustomPagination from 'src/components/custom-pagination'
import CustomSelect from 'src/components/custom-select'
import EditReview from 'src/views/pages/manage-order/reviews/Components/EditReview'
// ** Others
import toast from 'react-hot-toast'
import { OBJECT_TYPE_ERROR_ROLE } from 'src/configs/error'
import { formatFilter, toFullName } from 'src/utils'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
// ** Hooks
import { usePermission } from 'src/hooks/usePermission'
// ** Config
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'
import { FILTER_REVIEW_CMS } from 'src/configs/reviews'
import { Tooltip } from '@mui/material'
import TableHeader from 'src/components/table-header'
// ** Services
type TProps = {}
const ReviewListPage: NextPage<TProps> = () => {
  // ** Translate
  const { t } = useTranslation()
  // State
  const [openEdit, setOpenEdit] = useState({
    open: false,
    id: ''
  })
  const [openDeleteReview, setOpenDeleteReview] = useState({
    open: false,
    id: ''
  })
  const [sortBy, setSortBy] = useState('createdAt desc')
  const [searchBy, setSearchBy] = useState('')
  const [starSelected, setStarSelected] = useState<string[]>([])
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])
  const [page, setPage] = useState(1)
  const [filterBy, setFilterBy] = useState<Record<string, string | string[]>>({})
  const [openDeleteMultipleMultiple, setOpenDeleteMultipleMultiple] = useState(false)
  const [selectedRow, setSelectedRow] = useState<string[]>([])
  // ** Hooks
  const { VIEW, UPDATE, DELETE } = usePermission('SYSTEM.MANAGE_ORDER.REVIEW', ['CREATE', 'VIEW', 'UPDATE', 'DELETE'])
  const { i18n } = useTranslation()
  const optionReviews = FILTER_REVIEW_CMS()
  /// ** redux
  const dispatch: AppDispatch = useDispatch()
  const {
    reviews,
    isSuccessEdit,
    isErrorEdit,
    isLoading,
    messageErrorEdit,
    isErrorDelete,
    isSuccessDelete,
    messageErrorDelete,
    isSuccessMultipleDelete,
    isErrorMultipleDelete,
    messageErrorMultipleDelete,
    typeError
  } = useSelector((state: RootState) => state.reviews)
  // ** theme
  const theme = useTheme()
  // fetch api
  const handleGetListReviews = () => {
    const query = {
      params: { limit: pageSize, page: page, search: searchBy, order: sortBy, ...formatFilter(filterBy) }
    }
    dispatch(getAllReviewAsync(query))
  }
  // handle
  const handleCloseConfirmDeleteReview = () => {
    setOpenDeleteReview({
      open: false,
      id: ''
    })
  }
  const handleSort = (sort: GridSortModel) => {
    const sortOption = sort[0]
    if (sortOption) {
      setSortBy(`${sortOption.field} ${sortOption.sort}`)
    } else {
      setSortBy('createdAt desc')
    }
  }
  const handleCloseEdit = () => {
    setOpenEdit({
      open: false,
      id: ''
    })
  }

  const handleCloseConfirmDeleteMultiple = () => {
    setOpenDeleteMultipleMultiple(false)
  }
  const handleDeleteMultipleReview = () => {
    dispatch(
      deleteMultipleReviewAsync({
        reviewIds: selectedRow
      })
    )
  }
  const handleAction = (action: string) => {
    switch (action) {
      case 'delete': {
        setOpenDeleteMultipleMultiple(true)
        break
      }
    }
  }

  const handleDeleteReview = () => {
    dispatch(deleteReviewAsync(openDeleteReview.id))
  }
  const handleOnchangePagination = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }
  const columns: GridColDef[] = [
    {
      field: 'firstName',
      headerName: t('User'),
      hideSortIcons: true,
      flex: 1,
      renderCell: params => {
        const { row } = params
        const fullName = toFullName(
          row?.user?.lastName || '',
          row?.user?.middleName || '',
          row?.user?.firstName || '',
          i18n.language
        )
        return <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{fullName}</Typography>
      }
    },
    {
      field: 'name',
      headerName: t('Product_name'),
      minWidth: 200,
      maxWidth: 200,
      renderCell: params => {
        const { row } = params
        return (
          <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
            <Tooltip title={row.product.name}>
              <span>{row?.product?.name}</span>
            </Tooltip>
          </Typography>
        )
      }
    },
    {
      field: 'content',
      headerName: t('Content'),
      minWidth: 200,
      flex: 1,
      renderCell: params => {
        const { row } = params
        return <Typography>{row?.content}</Typography>
      }
    },
    {
      field: 'star',
      headerName: t('Star'),
      hideSortIcons: true,
      minWidth: 200,
      maxWidth: 200,
      renderCell: params => {
        const { row } = params
        return <Typography>{row?.star}</Typography>
      }
    },
    {
      field: 'action',
      headerName: t('Actions'),
      minWidth: 150,
      sortable: false,
      align: 'left',
      renderCell: params => {
        return (
          <>
            <GridEdit
              disabled={!UPDATE}
              onClick={() =>
                setOpenEdit({
                  open: true,
                  id: String(params.id)
                })
              }
            />
            <GridDelete
              disabled={!DELETE}
              onClick={() =>
                setOpenDeleteReview({
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
        rowLength={reviews.total}
      />
    )
  }
  useEffect(() => {
    handleGetListReviews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, searchBy, page, pageSize, filterBy])

  useEffect(() => {
    if (isSuccessMultipleDelete) {
      toast.success(t('Delete_multiple_review_success'))
      handleGetListReviews()
      dispatch(resetInitialState())
      handleCloseConfirmDeleteMultiple()
      setSelectedRow([])
    } else if (isErrorMultipleDelete && messageErrorMultipleDelete) {
      toast.error(t('Delete_multiple_review_error'))
      dispatch(resetInitialState())
    }
  }, [isSuccessMultipleDelete, isErrorMultipleDelete, messageErrorMultipleDelete])

  useEffect(() => {
    setFilterBy({ minStar: starSelected })
  }, [starSelected])

  useEffect(() => {
    if (isSuccessEdit) {
      toast.success(t('Update_review_success'))
      handleGetListReviews()
      handleCloseEdit()
      dispatch(resetInitialState())
    } else if (isErrorEdit && messageErrorEdit && typeError) {
      const errorConfig = OBJECT_TYPE_ERROR_ROLE[typeError]
      if (errorConfig) {
        toast.error(t(errorConfig))
      } else {
        toast.error(t('Update_review_error'))
      }
      dispatch(resetInitialState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessEdit, isErrorEdit, messageErrorEdit, typeError])
  useEffect(() => {
    if (isSuccessDelete) {
      toast.success(t('Delete_review_success'))
      handleGetListReviews()
      dispatch(resetInitialState())
      handleCloseConfirmDeleteReview()
    } else if (isErrorDelete && messageErrorDelete) {
      toast.error(t('Delete_review_error'))
      dispatch(resetInitialState())
    }
  }, [isSuccessDelete, isErrorDelete, messageErrorDelete])
  return (
    <>
      <ConfirmationDialog
        open={openDeleteReview.open}
        handleClose={handleCloseConfirmDeleteReview}
        handleCancel={handleCloseConfirmDeleteReview}
        handleConfirm={handleDeleteReview}
        title={t('Title_delete_review')}
        description={t('Confirm_delete_review')}
      />
      <ConfirmationDialog
        open={openDeleteMultipleMultiple}
        handleClose={handleCloseConfirmDeleteMultiple}
        handleCancel={handleCloseConfirmDeleteMultiple}
        handleConfirm={handleDeleteMultipleReview}
        title={t('Title_delete_multiple_review')}
        description={t('Confirm_delete_multiple_review')}
      />
      <EditReview open={openEdit.open} onClose={handleCloseEdit} idReview={openEdit.id} />
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
          {!selectedRow.length && (
            <Box
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, mb: 4, width: '100%' }}
            >
              <Box sx={{ width: '200px' }}>
                <CustomSelect
                  fullWidth
                  onChange={e => {
                    setStarSelected(e.target.value as string[])
                  }}
                  multiple
                  options={optionReviews}
                  value={starSelected}
                  placeholder={t('Star')}
                />
              </Box>
              <Box sx={{ width: '200px' }}>
                <InputSearch value={searchBy} onChange={(value: string) => setSearchBy(value)} />
              </Box>
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
            rows={reviews.data}
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
export default ReviewListPage
