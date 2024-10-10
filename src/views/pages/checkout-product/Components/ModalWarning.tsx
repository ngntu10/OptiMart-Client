// ** React
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
// ** Mui
import { Box, Button, Typography, useTheme } from '@mui/material'
// ** Component
import Icon from 'src/components/Icon'
import CustomModal from 'src/components/custom-modal'
// ** Config
import { ROUTE_CONFIG } from 'src/configs/route'
interface TModalWarning {
  open: boolean
  onClose: () => void
}
const ModalWarning = (props: TModalWarning) => {
  // ** Props
  const { open, onClose } = props
  // ** Hooks
  const theme = useTheme()
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <>
      <CustomModal open={open} onClose={onClose}>
        <Box
          sx={{
            padding: '20px',
            borderRadius: '15px',
            backgroundColor: theme.palette.customColors.bodyBg
          }}
          minWidth={{ md: '400px', xs: '80vw' }}
          maxWidth={{ md: '60vw', xs: '80vw' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative', paddingBottom: '20px' }}>
            <Typography variant='h4' sx={{ fontWeight: 600 }}>
              {t('Warning')}
            </Typography>
          </Box>
          <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4 }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Icon icon='ep:warning' fontSize={80} color={theme.palette.warning.main} />
            </Box>
            <Typography sx={{ textAlign: 'center', mt: 4 }}>{t('Warning_order_product')}</Typography>
            <Box
              sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}
              onClick={() => router.push(ROUTE_CONFIG.HOME)}
            >
              <Button variant='contained'>{t('Return_home')}</Button>
            </Box>
          </Box>
        </Box>
      </CustomModal>
    </>
  )
}
export default ModalWarning