// ** Type Import
import { OwnerStateThemeType } from '.'

const Progress = () => {
  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          height: 12,
          borderRadius: '10px',
          backgroundColor: theme.palette.customColors.trackBg,
          '& .MuiLinearProgress-dashed': {
            marginTop: theme.spacing(1)
          }
        }),
        bar: {
          borderRadius: '10px'
        }
      }
    }
  }
}

export default Progress
