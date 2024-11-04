// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Icon from 'src/components/Icon'
import { Avatar, SxProps, Theme, useTheme } from '@mui/material'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
import { useTranslation } from 'react-i18next'
// ** Type Import
// ** Custom Component Import
export type CardCountStatusOrderProps = {
  icon: string
  sx?: SxProps<Theme>
  avatarSize?: number
  iconSize?: number | string
  status: number
  countStatusOrder: {
    data: Record<number, number>
    total: number
  }
}
const CardCountStatusOrder = (props: any) => {
  // ** Hooks
  const theme = useTheme()
  const { t } = useTranslation()
  // ** Props
  const { sx, icon, countStatusOrder, iconSize = 24, avatarSize = 38, status } = props
  const mapOrderStatus = {
    0: {
      title: t('Wait_payment'),
      count: countStatusOrder?.data?.[0],
      themeColor: theme.palette.success.main
    },
    1: {
      title: t('Wait_delivery'),
      count: countStatusOrder?.data?.[1],
      themeColor: theme.palette.warning.main
    },
    2: {
      title: t('Done_order'),
      count: countStatusOrder?.data?.[2],
      themeColor: theme.palette.error.main
    },
    3: {
      title: t('Cancel_order'),
      count: countStatusOrder?.data?.[3],
      themeColor: theme.palette.info.main
    },
    4: {
      title: t('Total orders'),
      count: countStatusOrder?.total,
      themeColor: theme.palette.primary.main
    }
  }

  return (
    <Card sx={{ ...sx, backgroundColor: hexToRGBA((mapOrderStatus as any)[status]?.themeColor, 0.7), minHeight: '150px' }}>
      <CardContent sx={{ gap: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography sx={{ mb: 1, color: theme.palette.customColors.lightPaperBg }}>
            {(mapOrderStatus as any)[status]?.title}
          </Typography>
          <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant='h4' sx={{ color: theme.palette.customColors.lightPaperBg, fontWeight: 'bold' }}>
              {(mapOrderStatus as any)[status]?.count}
            </Typography>
          </Box>
        </Box>
        <Avatar variant='rounded' sx={{ width: avatarSize, height: avatarSize }}>
          <Icon icon={icon} fontSize={iconSize} color={(mapOrderStatus as any)[status]?.themeColor} />
        </Avatar>
      </CardContent>
    </Card>
  )
}
export default CardCountStatusOrder
