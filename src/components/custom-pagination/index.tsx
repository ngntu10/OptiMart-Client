import React, { Ref } from 'react'
import Box from '@mui/material/Box'
import { MenuItem, Pagination, PaginationProps, Select, styled } from '@mui/material'
import { useTranslation } from 'react-i18next'

const StylePagination = styled(Pagination)<PaginationProps>(({ theme }) => ({
  '& .MuiDataGrid-footerContainer': {
    '.MuiBox-root': {
      flex: 1,
      width: '100% !important'
    }
  }
}))

type TProps = {
  page: number // ** current page
  pageSize: number // ** current size row
  rowLength: number
  pageSizeOptions: number[]
  onChangePagination: (page: number, pageSize: number) => void
}

const CustomPagination = React.forwardRef((props: TProps, ref: Ref<any>) => {
  const { pageSize, page, rowLength, pageSizeOptions, onChangePagination, ...rests } = props

  const { t } = useTranslation()

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingLeft: '8px' }}
    >
      <Box>
        <span>{t('Đang hiển thị')} </span>
        <span style={{ fontWeight: 'bold' }}>
          {page === 1 ? page : 1 + pageSize}
          {' - '}
        </span>
        <span style={{ fontWeight: 'bold' }}>{page * pageSize} </span>
        <span>{t('trên')} </span>
        <span style={{ fontWeight: 'bold' }}>{rowLength}</span>
      </Box>
      <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <span>{t('Số dòng hiển thị')}</span>
          <Select
            size='small'
            sx={{
              width: '80px',
              padding: 0,
              '& .MuiSelect-select.MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall':
                { minWidth: 'unset !important', padding: '8.5px 12px 8.5px 24px !important' }
            }}
            value={pageSize}
            onChange={e => onChangePagination(1, +e.target.value)}
          >
            {pageSizeOptions.map(opt => {
              return (
                <MenuItem value={opt} key={opt}>
                  {opt}
                </MenuItem>
              )
            })}
          </Select>
        </Box>
        <StylePagination color='primary' {...rests} />
      </Box>
    </Box>
  )
})

export default CustomPagination
