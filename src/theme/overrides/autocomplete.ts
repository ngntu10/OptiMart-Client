// ** Type Imports
import { Skin } from 'src/types/layouts'
import { OwnerStateThemeType } from '.'

// ** Util Import
import { hexToRGBA } from 'src/utils/hex-to-rgba'

const Autocomplete = (skin: Skin) => {
  const boxShadow = (theme: OwnerStateThemeType['theme']) => {
    if (skin === 'bordered') {
      return theme.shadows[0]
    } else if (theme.palette.mode === 'light') {
      return theme.shadows[4]
    } else return '0px 3px 14px 0px rgba(15, 20, 34, 0.38)'
  }

  return {
    MuiAutocomplete: {
      styleOverrides: {
        popper: ({ theme }: OwnerStateThemeType) => ({
          '.MuiPaper-root': {
            boxShadow: boxShadow(theme),
            ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` }),
            '& .MuiAutocomplete-option .MuiListItemButton-root:hover': {
              backgroundColor: 'transparent'
            },
            '&.custom-autocomplete-paper': {
              ...theme.typography.body1,
              '& .MuiAutocomplete-option': {
                '&.Mui-focused': {
                  color: theme.palette.primary.main,
                  backgroundColor: hexToRGBA(theme.palette.primary.main, 0.08),
                  '& .MuiTypography-root, & svg': {
                    color: 'inherit'
                  }
                },
                '&[aria-selected="true"]': {
                  color: theme.palette.common.white,
                  backgroundColor: theme.palette.primary.main,
                  '& .MuiTypography-root, & svg': {
                    color: 'inherit'
                  }
                },
                '& .MuiCheckbox-root.Mui-checked path:first-of-type': {
                  fill: theme.palette.common.white
                },
                '& .MuiCheckbox-root.Mui-checked path:last-of-type': {
                  fill: theme.palette.primary.main,
                  stroke: theme.palette.primary.main
                }
              }
            }
          }
        }),
        inputRoot: {
          '& .MuiAutocomplete-tagSizeSmall': {
            height: 22
          }
        }
      }
    }
  }
}

export default Autocomplete
