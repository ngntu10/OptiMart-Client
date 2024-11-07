// ** Mui
import { Avatar, Box, Grid, Typography, useTheme } from '@mui/material'
// ** Components
import Icon from 'src/components/Icon'
// ** Utils
import { formatNumberToLocal } from 'src/utils'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
// ** Third party
import { useTranslation } from 'react-i18next'
interface TProps {
  data: Record<string, number>
}
const CardCountRecords = (props: TProps) => {
  // ** Props
  const { data } = props
  // ** Hooks
  const theme = useTheme()
  const { t } = useTranslation()
  const mapRecord = {
    user: {
      title: t('Users'),
      icon: 'ph:user-thin',
      theme: theme.palette.primary.main
    },
    product: {
      title: t('Products'),
      icon: 'fluent-mdl2:product',
      theme: theme.palette.error.main
    },
    order: {
      title: t('Orders'),
      icon: 'material-symbols:order-approve-rounded',
      theme: theme.palette.success.main
    },
    review: {
      title: t('Reviews'),
      icon: 'carbon:star-review',
      theme: theme.palette.info.main
    },
    comment: {
      title: t('Comments'),
      icon: 'ic:outline-comment',
      theme: theme.palette.secondary.main
    },
    revenue: {
      title: t('Revenue'),
      icon: 'nimbus:money',
      theme: theme.palette.warning.main
    }
  }
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        padding: '20px',
        height: '100%',
        width: '100%',
        borderRadius: '15px'
      }}
    >
      <Box>
        <Typography sx={{ fontSize: '30px', fontWeight: '600', mb: 4 }}>Statistics</Typography>
      </Box>
      <Grid container spacing={6}>
        {data &&
          Object.keys(data)?.map(record => {
            return (
              <Grid key={record} item md={3} sm={6} xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    variant='rounded'
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: hexToRGBA((mapRecord as any)[record]?.theme, 0.16)
                    }}
                  >
                    <Icon
                      icon={(mapRecord as any)[record]?.icon}
                      fontSize={30}
                      color={(mapRecord as any)[record].theme}
                    />
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontSize: '26px' }}>
                      {record === 'revenue' ? `${formatNumberToLocal(data[record])} VND` : data[record]}
                    </Typography>
                    <Typography sx={{ fontSize: '16px' }}>{(mapRecord as any)?.[record]?.title}</Typography>
                  </Box>
                </Box>
              </Grid>
            )
          })}
      </Grid>
    </Box>
  )
}
export default CardCountRecords
