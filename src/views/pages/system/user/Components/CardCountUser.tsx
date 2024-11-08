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
export type CardCountUserProps = {
  icon: string
  sx?: SxProps<Theme>
  avatarSize?: number
  iconSize?: number | string
  userType: number
  countUserType: {
    data: Record<number, number>
    totalUser: number
  }
}
const CardCountUser = (props: any) => {
  // ** Hooks
  const theme = useTheme()
  const { t } = useTranslation()
  // ** Props
  const { sx, icon, countUserType, count, iconSize = 24, avatarSize = 38, userType } = props
  const mapUserType = {
    1: {
      title: t('Google Users'),
      count: countUserType?.data?.[1],
      themeColor: theme.palette.success.main
    },
    2: {
      title: t('Facebook Users'),
      count: countUserType?.data?.[2],
      themeColor: theme.palette.error.main
    },
    3: {
      title: t('Email Users'),
      count: countUserType?.data?.[3],
      themeColor: theme.palette.info.main
    },
    4: {
      title: t('Total Users'),
      count: countUserType?.totalUser,
      themeColor: theme.palette.primary.main
    }
  }

  return (
    <Card sx={{ ...sx, backgroundColor: hexToRGBA((mapUserType as any)[userType]?.themeColor, 0.8) }}>
      <CardContent sx={{ gap: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography sx={{ mb: 1, color: theme.palette.customColors.lightPaperBg }}>
            {(mapUserType as any)[userType]?.title}
          </Typography>
          <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant='h4' sx={{ color: theme.palette.customColors.lightPaperBg, fontWeight: 'bold' }}>
              {(mapUserType as any)[userType]?.count || 0}
            </Typography>
          </Box>
        </Box>
        <Avatar variant='rounded' sx={{ width: avatarSize, height: avatarSize }}>
          <Icon icon={icon} fontSize={iconSize} color={(mapUserType as any)[userType]?.themeColor} />
        </Avatar>
      </CardContent>
    </Card>
  )
}
export default CardCountUser
