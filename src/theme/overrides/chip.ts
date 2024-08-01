// ** Type Import
import { OwnerStateThemeType } from '.'

// ** Util Imports
import { hexToRGBA } from 'src/utils/hex-to-rgba'

const Chip = () => {
  return {
    MuiChip: {
      styleOverrides: {
        root: ({ theme, ownerState }: OwnerStateThemeType) => ({
          fontWeight: 500,
          fontSize: theme.typography.body2.fontSize,
          ...(ownerState.size === 'medium' && {
            height: 30
          }),
          '&.MuiChip-rounded': {
            borderRadius: 4
          }
        }),
        outlined: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiChip-colorDefault': {
            borderColor: `rgba(${theme.palette.customColors.main}, 0.2)`
          }
        }),
        labelSmall: ({ theme }: OwnerStateThemeType) => ({
          paddingLeft: theme.spacing(2.5),
          paddingRight: theme.spacing(2.5)
        }),
        deleteIcon: {
          width: 18,
          height: 18
        },
        avatar: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.primary
        }),
        deletableColorPrimary: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.primary.main, 0.7),
            '&:hover': {
              color: theme.palette.primary.main
            }
          }
        }),
        deletableColorSecondary: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.secondary.main, 0.7),
            '&:hover': {
              color: theme.palette.secondary.main
            }
          }
        }),
        deletableColorSuccess: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.success.main, 0.7),
            '&:hover': {
              color: theme.palette.success.main
            }
          }
        }),
        deletableColorError: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.error.main, 0.7),
            '&:hover': {
              color: theme.palette.error.main
            }
          }
        }),
        deletableColorWarning: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.warning.main, 0.7),
            '&:hover': {
              color: theme.palette.warning.main
            }
          }
        }),
        deletableColorInfo: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.info.main, 0.7),
            '&:hover': {
              color: theme.palette.info.main
            }
          }
        })
      }
    }
  }
}

export default Chip
