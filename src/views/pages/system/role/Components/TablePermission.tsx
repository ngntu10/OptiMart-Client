// ** React
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import { Checkbox, Typography, useTheme } from '@mui/material'
import CustomDataGrid from 'src/components/custom-data-grid'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Redux
import { AppDispatch } from 'src/stores'
import { useDispatch } from 'react-redux'

// ** Others
import { LIST_DATA_PERMISSIONS, PERMISSIONS } from 'src/configs/permission'
import { getAllValueOfObject } from 'src/utils'

interface TTablePermission {
  setPermissionSelected: Dispatch<SetStateAction<string[]>>
  permissionSelected: string[]
  disabled: boolean
}

const TablePermission = (props: TTablePermission) => {
  const { t } = useTranslation()

  // ** Props
  const { setPermissionSelected, permissionSelected, disabled } = props

  const theme = useTheme()

  // handle
  const getValuePermission = (value: string, mode: string, parentValue?: string) => {
    try {
      return parentValue ? (PERMISSIONS as any)[parentValue][value][mode] : (PERMISSIONS as any)[value]
    } catch (error) {
      return ''
    }
  }

  const handleIsChecked = (value: string, parentValue?: string) => {
    const allValue = parentValue
      ? getAllValueOfObject((PERMISSIONS as any)[parentValue][value])
      : getAllValueOfObject((PERMISSIONS as any)[value])

    const isCheckedAll = allValue.every(item => permissionSelected.includes(item))

    return {
      isChecked: isCheckedAll,
      allValue: allValue
    }
  }

  const handleCheckAllCheckbox = (value: string, parentValue?: string) => {
    const { isChecked: isCheckedAll, allValue } = handleIsChecked(value, parentValue)
    if (isCheckedAll) {
      const filtered = permissionSelected.filter(item => !allValue.includes(item))
      setPermissionSelected(filtered)
    } else {
      setPermissionSelected([...new Set([...permissionSelected, ...allValue])])
    }
  }

  const handleOnChangeCheckBox = (value: string) => {
    const isChecked = permissionSelected.includes(value)
    if (isChecked) {
      const filtered = permissionSelected.filter(item => item !== value)
      setPermissionSelected(filtered)
    } else {
      setPermissionSelected([...permissionSelected, value])
    }
  }

  const handleCheckAllGroupCheckbox = (value: string) => {
    const { isChecked: isCheckedAll, allValue } = handleIsChecked(value)
    if (isCheckedAll) {
      const filtered = permissionSelected.filter(item => !allValue.includes(item))
      setPermissionSelected(filtered)
    } else {
      setPermissionSelected([...new Set([...permissionSelected, ...allValue])])
    }
  }

  // ** Redux
  const dispatch: AppDispatch = useDispatch()

  const columns: GridColDef[] = [
    {
      field: 'all',
      headerName: '',
      minWidth: 80,
      maxWidth: 80,
      sortable: false,

      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        const { isChecked, allValue } = handleIsChecked(row.value, row.parentValue)

        return (
          <>
            {' '}
            {!row?.isHideAll && (
              <Checkbox
                disabled={disabled}
                checked={isChecked}
                value={row?.value}
                onChange={e => {
                  if (row.isParent) {
                    handleCheckAllGroupCheckbox(e.target.value)
                  } else {
                    handleCheckAllCheckbox(e.target.value, row.parentValue)
                  }
                }}
              />
            )}
          </>
        )
      }
    },
    {
      field: 'name',
      headerName: t('Name'),
      flex: 1,
      minWidth: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Typography
            sx={{
              color: row?.isParent ? theme.palette.primary.main : `rgba(${theme.palette.customColors.main}, 0.78s)`,
              paddingLeft: row?.isParent ? '0' : '20px',
              textTransform: row?.isParent ? 'uppercase' : 'normal'
            }}
          >
            {t(row?.name)}
          </Typography>
        )
      }
    },
    {
      field: 'view',
      headerName: t('View'),
      minWidth: 80,
      maxWidth: 80,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        const value = getValuePermission(row.value, 'VIEW', row.parentValue)

        return (
          <>
            {!row.isHideView && !row.isParent && (
              <Checkbox
                disabled={disabled || row.value === PERMISSIONS.DASHBOARD}
                value={value}
                onChange={e => {
                  handleOnChangeCheckBox(e.target.value)
                }}
                checked={permissionSelected.includes(value)}
              />
            )}
          </>
        )
      }
    },
    {
      field: 'create',
      headerName: t('Create'),
      minWidth: 80,
      maxWidth: 80,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        const value = getValuePermission(row.value, 'CREATE', row.parentValue)

        return (
          <>
            {!row?.isHideCreate && !row.isParent && (
              <Checkbox
                disabled={disabled}
                value={value}
                onChange={e => {
                  handleOnChangeCheckBox(e.target.value)
                }}
                checked={permissionSelected.includes(value)}
              />
            )}
          </>
        )
      }
    },
    {
      field: 'update',
      headerName: t('Edit'),
      minWidth: 80,
      maxWidth: 80,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        const value = getValuePermission(row.value, 'UPDATE', row.parentValue)

        return (
          <>
            {!row?.isHideUpdate && !row.isParent && (
              <Checkbox
                disabled={disabled}
                value={value}
                onChange={e => {
                  handleOnChangeCheckBox(e.target.value)
                }}
                checked={permissionSelected.includes(value)}
              />
            )}
          </>
        )
      }
    },
    {
      field: 'delete',
      headerName: t('Delete'),
      minWidth: 80,
      maxWidth: 80,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        const value = getValuePermission(row.value, 'DELETE', row.parentValue)

        return (
          <>
            {!row.isHideDelete && !row.isParent && (
              <Checkbox
                disabled={disabled}
                value={value}
                onChange={e => {
                  handleOnChangeCheckBox(e.target.value)
                }}
                checked={permissionSelected.includes(value)}
              />
            )}
          </>
        )
      }
    }
  ]

  return (
    <>
      <CustomDataGrid
        rows={LIST_DATA_PERMISSIONS}
        columns={columns}
        autoHeight
        hideFooter
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnMenu
      />
    </>
  )
}

export default TablePermission
