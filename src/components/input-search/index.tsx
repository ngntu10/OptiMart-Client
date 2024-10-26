// ** React
import React, { KeyboardEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import { InputBase, styled } from '@mui/material'
import Icon from 'src/components/Icon'
import { useDebounce } from 'src/hooks/useDebounce'

interface TInputSearch {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  marginLeft: '0 !important',
  height: '38px',
  width: '100%',
  border: `1px solid ${theme.palette.customColors.borderColor}`,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  height: '100%',
  '& .MuiInputBase-input': {
    width: '100%',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`
  }
}))

const InputSearch = (props: TInputSearch) => {
  // translate
  const { t } = useTranslation()
  // ** Props
  const { value, onChange, placeholder = t('Search') } = props

  // ** State
  const [search, setSearch] = useState('')
  const debounceSearch = useDebounce(search, 500)

  useEffect(() => {
    setSearch(value)
  }, [value])

  useEffect(() => {
    onChange(debounceSearch)
  }, [debounceSearch])

  return (
    <Search>
      <SearchIconWrapper>
        <Icon icon='material-symbols-light:search' />
      </SearchIconWrapper>
      <StyledInputBase
        value={search}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search' }}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          if (e.key === 'Enter' && (e as any).target.value) {
            onChange((e as any).target.value)
          }
        }}
        onChange={e => {
          setSearch(e.target.value)
          if (!e.target.value) {
            onChange(e.target.value)
          }
        }}
      />
    </Search>
  )
}

export default InputSearch
