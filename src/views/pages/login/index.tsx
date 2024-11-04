/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

// ** Next
import Link from 'next/link'
import { NextPage } from 'next'
import Image from 'next/image'

//** React
import { useContext, useEffect, useRef, useState } from 'react'

// ** Components
import CustomTextField from 'src/components/text-field'
import { ROUTE_CONFIG } from 'src/configs/route'

// ** form
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Mui
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  ThemeProvider,
  Typography,
  useTheme,
  useThemeProps,
  Divider,
  Alert
} from '@mui/material'

// ** Configs
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import { signIn, useSession } from 'next-auth/react'
import { loginAuth } from 'src/services/auth'
import {
  clearLocalPreTokenAuthSocial,
  getLocalPreTokenAuthSocial,
  setLocalPreTokenAuthSocial
} from 'src/helpers/storage'
import IconifyIcon from 'src/components/Icon'
import { Icon } from '@iconify/react/dist/iconify.js'

// ** Images
import LoginDark from '/public/images/login-dark.png'
import LoginLight from '/public/images/login-light.png'
import FacebookSVG from '/public/svgs/facebook.svg'
import GoogleSVG from '/public/svgs/google.svg'
import themeConfig from 'src/configs/themeConfig'
import UseBgColor from 'src/hooks/useBgColor'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import FallbackSpinner from 'src/components/fall-back'

type Tprops = {}

const LoginPage: NextPage<Tprops> = () => {
  // ** State
  const [showPassword, setShowPassword] = useState(false)
  const [isRemember, setIsRemember] = useState(false)
  const prevTokenLocal = getLocalPreTokenAuthSocial()

  //** Theme
  const theme = useTheme()
  const bgColors = UseBgColor()

  // ** Translate
  const { t } = useTranslation()

  // ** context
  const { login, loginGoogle, loginFacebook } = useAuth()

  // ** Hooks
  const { data: session, status } = useSession()

  const schema = yup.object().shape({
    email: yup.string().required(t('Required_field')).matches(EMAIL_REG, t('Rules_email')),
    password: yup.string().required(t('Required_field')).matches(PASSWORD_REG, t('Rules_password'))
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: { email: string; password: string }) => {
    if (Object.keys(errors)?.length == 0) {
      login({ ...data, rememberMe: isRemember }, err => {
        if (err?.response?.data?.typeError === 'INVALID') toast.error(t('The_email_or_password_wrong'))
      })
    }
  }

  const handleLoginGoogle = () => {
    signIn('google')
    clearLocalPreTokenAuthSocial()
  }
  const handleLoginFacebook = () => {
    signIn('facebook')
    clearLocalPreTokenAuthSocial()
  }
  useEffect(() => {
    if ((session as any)?.accessToken && (session as any)?.accessToken !== prevTokenLocal) {
      if ((session as any)?.provider === 'facebook') {
        loginFacebook({ idToken: (session as any)?.accessToken, rememberMe: isRemember }, err => {
          if (err?.response?.data?.typeError === 'INVALID') toast.error(t('The_email_or_password_wrong'))
        })
      } else {
        loginGoogle({ idToken: (session as any)?.accessToken, rememberMe: isRemember }, err => {
          if (err?.response?.data?.typeError === 'INVALID') toast.error(t('The_email_or_password_wrong'))
        })
      }
      setLocalPreTokenAuthSocial((session as any)?.accessToken)
    }
  }, [(session as any)?.accessToken])

  return (
    <>
      {status === 'loading' && <FallbackSpinner />}
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box
          display={{
            sm: 'flex',
            xs: 'none'
          }}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.customColors.bodyBg,
            height: '100%',
            minWidth: '68vw'
          }}
        >
          <Image
            src={theme.palette.mode == 'light' ? LoginLight : LoginDark}
            alt='login image'
            style={{
              height: '80%',
              width: '80%',
              objectFit: 'contain'
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
              <Typography variant='h3' sx={{ mb: 1.5, mt: 5.5, fontSize: '27px' }}>
                {`Welcome to ${themeConfig.templateName}! 👋🏻`}
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5.5 }}>
                Please sign-in to your account and start the adventure
              </Typography>
              <Box
                sx={{ p: 3, mb: 6, ...bgColors.primaryLight, borderRadius: '10px', '& .MuiAlert-message': { p: 0 } }}
              >
                <Typography variant='body2' sx={{ mb: 2, color: 'primary.main' }}>
                  Admin: <strong>admin@gmail.com</strong> / Pass: <strong>Admin@123</strong>
                </Typography>
                <Typography variant='body2' sx={{ color: 'primary.main' }}>
                  Client: <strong>client@gmail.com</strong> / Pass: <strong>Client@123</strong>
                </Typography>
              </Box>
              <Box sx={{ mt: 5, width: '370px', mb: 8 }}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('Email')}
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      placeholder={t('Enter_email')}
                      error={Boolean(errors?.email)}
                      helperText={errors?.email?.message}
                    />
                  )}
                  name='email'
                />
              </Box>
              <Box sx={{ mt: 8, width: '370px', mb: 6 }}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('Password')}
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      placeholder={t('Enter_password')}
                      error={Boolean(errors?.password)}
                      helperText={errors?.password?.message}
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={() => {
                                setShowPassword(!showPassword)
                              }}
                            >
                              {showPassword ? (
                                <Icon icon='material-symbols:visibility' />
                              ) : (
                                <Icon icon='material-symbols:visibility-off-rounded' />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                  name='password'
                />
              </Box>
              <Box
                sx={{
                  mb: 1.75,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      value='remember'
                      color='primary'
                      checked={isRemember}
                      onChange={e => setIsRemember(e.target.checked)}
                    />
                  }
                  label={t('Remember_me')}
                />
                <Typography variant='body2' component={Link} href={`${ROUTE_CONFIG.FORGOT_PASSWORD}`}>
                  {t('Forgot_password')}?
                </Typography>
              </Box>
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                {t('Login')}
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <Typography>{t('You_have_account')}</Typography>

                <Link
                   href={`${ROUTE_CONFIG.REGISTER}`}
                  style={{
                    color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white,
                    fontSize: '16px'
                  }}
                >
                  {t('Register')}
                </Link>
              </Box>
              <Divider
                sx={{
                  color: 'text.disabled',
                  '& .MuiDivider-wrapper': { px: 6 },
                  fontSize: theme.typography.body2.fontSize,
                  my: theme => `${theme.spacing(6)} !important`
                }}
              >
                {t('Or')}
              </Divider>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={handleLoginFacebook}>
                  <Icon icon='mdi:facebook' />
                </IconButton>
                <IconButton href='/' component={Link} sx={{ color: '#1da1f2' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:twitter' />
                </IconButton>
                <IconButton
                  href='/'
                  component={Link}
                  onClick={e => e.preventDefault()}
                  sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
                >
                  <Icon icon='mdi:github' />
                </IconButton>
                <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={handleLoginGoogle}>
                  <Icon icon='mdi:google' />
                </IconButton>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default LoginPage
