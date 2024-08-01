// ** Type Imports
import { OwnerStateThemeType } from '.'

// ** Util Import
import { hexToRGBA } from 'src/utils/hex-to-rgba'

const Menu = () => {
  return {
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }: OwnerStateThemeType) => ({
          '& .MuiMenuItem-root .MuiCheckbox-root.Mui-checked path:first-of-type': {
            fill: theme.palette.common.white
          },
          '& .MuiMenuItem-root .MuiCheckbox-root.Mui-checked path:last-of-type': {
            fill: theme.palette.primary.main,
            stroke: theme.palette.primary.main
          }
        })
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(2, 4),
          margin: theme.spacing(0, 2, 1),
          borderRadius: theme.shape.borderRadius,
          '&:last-child': {
            marginBottom: 0
          },
          '&:not(.Mui-focusVisible):hover': {
            color: theme.palette.primary.main,
            backgroundColor: hexToRGBA(theme.palette.primary.main, 0.08),
            '& .MuiListItemIcon-root, & .MuiListItemText-primary, & .MuiListItemText-secondary, & .MuiListItemSecondaryAction-root .MuiIconButton-root':
              {
                color: theme.palette.primary.main
              }
          },
          '&.Mui-selected': {
            color: `${theme.palette.common.white} !important`,
            backgroundColor: `${theme.palette.primary.main} !important`,
            '&.Mui-focusVisible': {
              backgroundColor: `${theme.palette.primary.dark} !important`
            },
            '& .MuiListItemIcon-root, & .MuiListItemText-primary, & .MuiListItemText-secondary, & .MuiListItemSecondaryAction-root .MuiIconButton-root':
              {
                color: `${theme.palette.common.white} !important`
              }
          }
        })
      },
      defaultProps: {
        disableRipple: true
      }
    }
  }
}

export default Menu
