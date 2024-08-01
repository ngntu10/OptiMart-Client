// ** Type Import
import { OwnerStateThemeType } from '.'

// ** Util Import
import { hexToRGBA } from 'src/utils/hex-to-rgba'

const List = () => {
  return {
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          paddingLeft: theme.spacing(5),
          paddingRight: theme.spacing(5),
          '&:hover': {
            backgroundColor: hexToRGBA(theme.palette.primary.main, 0.08),
            '& .MuiListItemIcon-root, & .MuiListItemText-primary, & .MuiListItemText-secondary, & .MuiListItemSecondaryAction-root .MuiIconButton-root':
              {
                color: theme.palette.primary.main
              }
          },
          '&.Mui-selected, &.Mui-selected:hover': {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary, & .MuiListItemText-secondary, & .MuiListItemSecondaryAction-root .MuiIconButton-root':
              {
                color: theme.palette.primary.main
              }
          }
        })
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          minWidth: '0 !important',
          marginRight: theme.spacing(2.25),
          color: theme.palette.text.primary
        })
      }
    },
    MuiListItemAvatar: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          minWidth: 0,
          marginRight: theme.spacing(4)
        })
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          marginTop: theme.spacing(0.5),
          marginBottom: theme.spacing(0.5)
        }),
        dense: ({ theme }: OwnerStateThemeType) => ({
          '& .MuiListItemText-primary': {
            color: theme.palette.text.primary
          }
        })
      }
    },
    MuiListSubheader: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          textTransform: 'uppercase',
          color: theme.palette.text.disabled
        })
      }
    }
  }
}

export default List
