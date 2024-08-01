// ** Type Import
import { OwnerStateThemeType } from '.'

// ** Util Import
import { hexToRGBA } from 'src/utils/hex-to-rgba'

const ButtonGroup = () => {
  return {
    MuiButtonGroup: {
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: ({ theme }: OwnerStateThemeType) => ({
            backgroundColor: theme.palette.primary.main
          })
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: ({ theme }: OwnerStateThemeType) => ({
            backgroundColor: theme.palette.secondary.main
          })
        },
        {
          props: { variant: 'contained', color: 'success' },
          style: ({ theme }: OwnerStateThemeType) => ({
            backgroundColor: theme.palette.success.main
          })
        },
        {
          props: { variant: 'contained', color: 'error' },
          style: ({ theme }: OwnerStateThemeType) => ({
            backgroundColor: theme.palette.error.main
          })
        },
        {
          props: { variant: 'contained', color: 'warning' },
          style: ({ theme }: OwnerStateThemeType) => ({
            backgroundColor: theme.palette.warning.main
          })
        },
        {
          props: { variant: 'contained', color: 'info' },
          style: ({ theme }: OwnerStateThemeType) => ({
            backgroundColor: theme.palette.info.main
          })
        },
        {
          props: { variant: 'tonal', color: 'primary', orientation: 'horizontal' },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderRight: `1px solid ${hexToRGBA(theme.palette.primary.main, 0.24)}`
            }
          })
        },
        {
          props: { variant: 'tonal', color: 'secondary', orientation: 'horizontal' },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderRight: `1px solid ${hexToRGBA(theme.palette.secondary.main, 0.24)}`
            }
          })
        },
        {
          props: { variant: 'tonal', color: 'error', orientation: 'horizontal' },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderRight: `1px solid ${hexToRGBA(theme.palette.error.main, 0.24)}`
            }
          })
        },
        {
          props: { variant: 'tonal', color: 'warning', orientation: 'horizontal' },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderRight: `1px solid ${hexToRGBA(theme.palette.warning.main, 0.24)}`
            }
          })
        },
        {
          props: { variant: 'tonal', color: 'info', orientation: 'horizontal' },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderRight: `1px solid ${hexToRGBA(theme.palette.info.main, 0.24)}`
            }
          })
        },
        {
          props: { variant: 'tonal', color: 'success', orientation: 'horizontal' },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderRight: `1px solid ${hexToRGBA(theme.palette.success.main, 0.24)}`
            }
          })
        },
        {
          props: { variant: 'tonal', color: 'primary', orientation: 'vertical' },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderBottom: `1px solid ${hexToRGBA(theme.palette.primary.main, 0.24)}`
            }
          })
        },
        {
          props: { variant: 'tonal', color: 'secondary', orientation: 'vertical' },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderBottom: `1px solid ${hexToRGBA(theme.palette.secondary.main, 0.24)}`
            }
          })
        },
        {
          props: { variant: 'tonal', color: 'error', orientation: 'vertical' },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderBottom: `1px solid ${hexToRGBA(theme.palette.error.main, 0.24)}`
            }
          })
        },
        {
          props: { variant: 'tonal', color: 'warning', orientation: 'vertical' },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderBottom: `1px solid ${hexToRGBA(theme.palette.warning.main, 0.24)}`
            }
          })
        },
        {
          props: { variant: 'tonal', color: 'info', orientation: 'vertical' },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderBottom: `1px solid ${hexToRGBA(theme.palette.info.main, 0.24)}`
            }
          })
        },
        {
          props: { variant: 'tonal', color: 'success', orientation: 'vertical' },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderBottom: `1px solid ${hexToRGBA(theme.palette.success.main, 0.24)}`
            }
          })
        }
      ]
    }
  }
}

export default ButtonGroup
