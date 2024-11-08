
// ** React Imports
import { ReactNode } from 'react'
// ** Next Import
import Link from 'next/link'
// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
// ** Layout Import
import BlankLayout from 'src/views/layouts/BlankLayout'

// ** Third party
import { useTranslation } from 'react-i18next'
// ** Configs
import { ROUTE_CONFIG } from 'src/configs/route'
// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(20)
  }
}))
const Error500 = () => {
  const { t } = useTranslation()
  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography variant='h2' sx={{ mb: 1.5 }}>
            {t("Oops, something went wrong!")}
          </Typography>
          <Typography sx={{ mb: 6, color: 'text.secondary' }}>
            {t("There was an error with the internal server. Please contact your site administrator.")}
          </Typography>
          <Button href={ROUTE_CONFIG.HOME} component={Link} variant='contained'>
            {t("Back to Home")}
          </Button>
        </BoxWrapper>
        <Img height='500' alt='error-illustration' src='/images/404.png' />
      </Box>
    </Box>
  )
}

Error500.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default Error500