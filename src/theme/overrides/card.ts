// ** Type Imports
import { Skin } from 'src/types/layouts'
import { OwnerStateThemeType } from '.'

const Card = (skin: Skin) => {
  return {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` }),
          '& .card-more-options': {
            marginTop: theme.spacing(-1),
            marginRight: theme.spacing(-3)
          },
          '& .MuiTableContainer-root, & .MuiDataGrid-root, & .MuiDataGrid-columnHeaders': {
            borderRadius: 0
          }
        })
      },
      defaultProps: {
        elevation: skin === 'bordered' ? 0 : 7
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(6),
          '& + .MuiCardContent-root, & + .MuiCardActions-root, & + .MuiCollapse-root .MuiCardContent-root': {
            paddingTop: 0
          },
          '& .MuiCardHeader-subheader': {
            marginTop: theme.spacing(0.5),
            color: theme.palette.text.disabled,
            fontSize: theme.typography.body2.fontSize,
            lineHeight: theme.typography.body2.lineHeight
          }
        }),
        title: ({ theme }: OwnerStateThemeType) => ({
          fontWeight: 500,
          lineHeight: 1.334,
          letterSpacing: '0.15px',
          fontSize: theme.typography.h5.fontSize
        }),
        action: {
          marginTop: 0,
          marginRight: 0
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(6),
          '& + .MuiCardHeader-root, & + .MuiCardContent-root, & + .MuiCardActions-root': {
            paddingTop: 0
          },
          '&:last-of-type': {
            paddingBottom: theme.spacing(6)
          }
        })
      }
    },
    MuiCardActions: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(6),
          '& .MuiButton-text': {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3)
          },
          '&.card-action-dense': {
            padding: theme.spacing(0, 3, 3),
            '.MuiCard-root .MuiCardMedia-root + &': {
              paddingTop: theme.spacing(3)
            }
          },
          '.MuiCard-root &:first-of-type': {
            paddingTop: theme.spacing(3),
            '& + .MuiCardHeader-root, & + .MuiCardContent-root, & + .MuiCardActions-root': {
              paddingTop: 0
            }
          }
        })
      }
    }
  }
}

export default Card
