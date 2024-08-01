// ** Type Imports
import { Skin } from 'src/types/layouts'
import { OwnerStateThemeType } from '.'

const Snackbar = (skin: Skin) => {
  return {
    MuiSnackbarContent: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          ...(skin === 'bordered' && { boxShadow: 'none' }),
          backgroundColor: `rgb(${theme.palette.customColors.main})`,
          color: theme.palette.common[theme.palette.mode === 'light' ? 'white' : 'black']
        })
      }
    }
  }
}

export default Snackbar
