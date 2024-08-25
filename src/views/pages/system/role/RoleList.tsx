// ** Next
import { NextPage } from 'next'
import { useRouter } from 'next/router'

// ** React
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import { Box, Grid, useTheme } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { resetInitialState } from 'src/stores/role'

// ** Components
import GridDelete from 'src/components/grid-delete'
import GridEdit from 'src/components/grid-edit'
import GridCreate from 'src/components/grid-create'
import InputSearch from 'src/components/input-search'
import CustomDataGrid from 'src/components/custom-data-grid'
import CustomPagination from 'src/components/custom-pagination'
import Spinner from 'src/components/spinner'

// ** Others
import toast from 'react-hot-toast'
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'
import CreateEditRole from './Components/CreateEditRole'
import { deleteRoleAsync, getAllRolesAsync } from 'src/stores/role/action'

type TProps = {}

const RoleListPage: NextPage<TProps> = () => {
  // State
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])
  const [openCreateEdit, setOpenCreateEdit] = useState({
    open: false,
    id: ''
  })

  // ** router
  const router = useRouter()

  // ** Translate
  const { t } = useTranslation()

  /// ** redux
  const dispatch: AppDispatch = useDispatch()
  const {
    roles,
    isSuccessCreateEdit,
    isErrorCreateEdit,
    isLoading,
    messageErrorCreateEdit,
    isErrorDelete,
    isSuccessDelete,
    messageErrorDelete
  } = useSelector((state: RootState) => state.role)

  // ** theme
  const theme = useTheme()

  // fetch api

  const handleGetListRoles = () => {
    dispatch(getAllRolesAsync({ params: { limit: -1, page: -1, search: '' } }))
  }

  // handle
  const handleOnchangePagination = (page: number, pageSize: number) => {}

  const handleCloseCreateEdit = () => {
    setOpenCreateEdit({
      open: false,
      id: ''
    })
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: t('Name'),
      flex: 1
    },
    {
      field: 'action',
      headerName: t('Actions'),
      minWidth: 150,
      sortable: false,
      align: 'left',
      renderCell: row => {
        return (
          <Box>
            <GridEdit
              onClick={() =>
                setOpenCreateEdit({
                  open: true,
                  id: String(row.id)
                })
              }
            />
            <GridDelete onClick={() => dispatch(deleteRoleAsync(String(row.id)))} />
          </Box>
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
        rowLength={roles.total}
      />
    )
  }

  useEffect(() => {
    handleGetListRoles()
  }, [])

  useEffect(() => {
    if (isSuccessCreateEdit) {
      if (openCreateEdit.id) {
        toast.success(t('update-role-success'))
      } else {
        toast.success(t('create-role-success'))
      }
      handleGetListRoles()
      handleCloseCreateEdit()
      dispatch(resetInitialState())
    } else if (isErrorCreateEdit && messageErrorCreateEdit) {
      toast.error(t(messageErrorCreateEdit))
      dispatch(resetInitialState())
    }
  }, [isSuccessCreateEdit, isErrorCreateEdit, messageErrorCreateEdit])

  useEffect(() => {
    if (isSuccessDelete) {
      toast.success(t('delete-role-success'))
      handleGetListRoles()
      dispatch(resetInitialState())
    } else if (isErrorDelete && messageErrorDelete) {
      toast.error(t(messageErrorDelete))
      dispatch(resetInitialState())
    }
  }, [isSuccessDelete, isErrorDelete, messageErrorDelete])

  return (
    <>
      <CreateEditRole open={openCreateEdit.open} onClose={handleCloseCreateEdit} idRole={openCreateEdit.id} />
      {isLoading && <Spinner />}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          padding: '20px',
          height: '100%'
        }}
      >
        <Grid container sx={{ height: '100%', width: '100%' }}>
          <Grid item md={5} xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ width: '200px' }}>
                <InputSearch />
              </Box>
              <GridCreate
                onClick={() =>
                  setOpenCreateEdit({
                    open: true,
                    id: ''
                  })
                }
              />
            </Box>
            <CustomDataGrid
              rows={roles.data}
              columns={columns}
              pageSizeOptions={[5]}
              // checkboxSelection
              autoHeight
              hideFooter
              getRowId={row => row._id}
              disableRowSelectionOnClick
              slots={{
                pagination: PaginationComponent
              }}
              disableColumnFilter
              disableColumnMenu
            />
          </Grid>
          <Grid item md={7} xs={12}>
            List permission
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default RoleListPage
