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
export type CardCountProductProps = {
  icon: string
  sx?: SxProps<Theme>
  avatarSize?: number
  iconSize?: number | string
  userType: number
  countProductStatus: {
    data: Record<number, number>
    total: number
  }
}
const CardCountProduct = (props: any) => {
  // ** Hooks
  const theme = useTheme()
  const { t } = useTranslation()
  // ** Props
  const { sx, icon, countProductStatus, count, iconSize = 24, avatarSize = 38, status } = props
  const mapProductStatus = {
    1: {
      title: t('Public Products'),
      count: countProductStatus?.data?.[1],
      themeColor: theme.palette.success.main
    },
    2: {
      title: t('Total Product'),
      count: countProductStatus?.total,
      themeColor: theme.palette.error.main
    },
    0: {
      title: t('Private Products'),
      count: countProductStatus?.data?.[0],
      themeColor: theme.palette.info.main
    }
  }

  return (
    <Card sx={{ ...sx, backgroundColor: hexToRGBA((mapProductStatus as any)[status]?.themeColor, 0.7) }}>
      <CardContent sx={{ gap: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography sx={{ mb: 1, color: theme.palette.customColors.lightPaperBg }}>
            {(mapProductStatus as any)[status]?.title}
          </Typography>
          <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant='h4' sx={{ color: theme.palette.customColors.lightPaperBg, fontWeight: 'bold' }}>
              {(mapProductStatus as any)[status]?.count}
            </Typography>
          </Box>
        </Box>
        <Avatar variant='rounded' sx={{ width: avatarSize, height: avatarSize }}>
          <Icon icon={icon} fontSize={iconSize} color={(mapProductStatus as any)[status]?.themeColor} />
        </Avatar>
      </CardContent>
    </Card>
  )
}
export default CardCountProduct
