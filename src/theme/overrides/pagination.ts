// ** Type Import
import { OwnerStateThemeType } from '.'

// ** Util Import
import { hexToRGBA } from 'src/utils/hex-to-rgba'

const Pagination = () => {
  return {
    MuiPaginationItem: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          height: 38,
          minWidth: 38,
          '&:not(.MuiPaginationItem-rounded)': {
            borderRadius: '50%'
          },
          '&:not(.MuiPaginationItem-outlined):not(.Mui-disabled)': {
            transition: theme.transitions.create(['color', 'background-color', 'box-shadow'], {
              duration: 250,
              easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }),
            '&.Mui-selected': {
              boxShadow: theme.shadows[2]
            }
          }
        }),
        sizeSmall: {
          height: 28,
          minWidth: 28,
          borderRadius: 4
        },
        sizeLarge: {
          height: 48,
          minWidth: 48,
          borderRadius: 8
        },
        ellipsis: {
          height: 'auto'
        },
        outlined: ({ theme }: OwnerStateThemeType) => ({
          borderColor: `rgba(${theme.palette.customColors.main}, 0.2)`
        }),
        outlinedPrimary: ({ theme }: OwnerStateThemeType) => ({
          '&.Mui-selected': {
            backgroundColor: hexToRGBA(theme.palette.primary.main, 0.16)
          }
        }),
        outlinedSecondary: ({ theme }: OwnerStateThemeType) => ({
          '&.Mui-selected': {
            backgroundColor: hexToRGBA(theme.palette.secondary.main, 0.16)
          }
        })
      }
    }
  }
}

export default Pagination
