// ** MUI Imports
import { ThemeOptions } from '@mui/material'

const UserThemeOptions = (): ThemeOptions => {
  return {
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 992,
        lg: 1200,
        xl: 1920
      }
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true
        },
        styleOverrides: {
          root: {
            textTransform: 'none'
          },
          sizeSmall: {
            padding: '6px 16px'
          },
          sizeMedium: {
            padding: '8px 20px'
          },
          sizeLarge: {
            padding: '11px 24px'
          },
          textSizeSmall: {
            padding: '7px 12px'
          },
          textSizeMedium: {
            padding: '9px 16px'
          },
          textSizeLarge: {
            padding: '12px 16px'
          }
        }
      },
      MuiCardActions: {
        styleOverrides: {
          root: {
            padding: '16px 24px'
          }
        }
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '32px 24px',
            '&:last-child': {
              paddingBottom: '32px'
            }
          }
        }
      },
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            boxSizing: 'border-box'
          },
          html: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%',
            width: '100%'
          },
          body: {
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            minHeight: '100%',
            width: '100%'
          },
          '#__next': {
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            height: '100%',
            width: '100%'
          }
        }
      }
    },
    shape: {
      borderRadius: 10
    },
    typography: {
      fontFamily: '"Myriad Pro", sans-serif'
    },
    zIndex: {
      appBar: 1200,
      drawer: 1100
    }
  }
}

export default UserThemeOptions
