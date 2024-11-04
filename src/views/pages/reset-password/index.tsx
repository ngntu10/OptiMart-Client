// ** Next
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
// ** React
import { useContext, useEffect, useRef, useState } from 'react'
// ** Mui
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Typography,
  useTheme
} from '@mui/material'
// ** Components
import CustomTextField from 'src/components/text-field'
import Icon from 'src/components/Icon'
// ** form
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// ** Config
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
// ** Images
import ResetPasswordDark from '/public/images/reset-password-dark.png'
import ResetPasswordLight from '/public/images/reset-password-light.png'
// ** Hooks
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { ROUTE_CONFIG } from 'src/configs/route'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import Spinner from 'src/components/spinner'
import { resetInitialState } from 'src/stores/auth'
import { resetPasswordAuthAsync } from 'src/stores/auth/action'

type TProps = {}
type TDefaultValue = {
  newPassword: string
  confirmNewPassword: string
}
const ResetPasswordPage: NextPage<TProps> = () => {
  // ** State
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  // ** Translate
  const { t } = useTranslation()
  // ** Router
    const router = useRouter()
    const secretKey = router?.query?.secretKey as string
  // ** theme
  const theme = useTheme()
  const schema = yup.object().shape({
    newPassword: yup.string().required(t('Required_field')).matches(PASSWORD_REG, t('Rules_password')),
    confirmNewPassword: yup
      .string()
      .required(t('Required_field'))
      .matches(PASSWORD_REG, t('Rules_password'))
      .oneOf([yup.ref('newPassword'), ''], t('Rules_confirm_password'))
  })
  // ** Redux
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, isSuccessResetPassword, isErrorResetPassword, messageResetPassword } = useSelector(
    (state: RootState) => state.auth
  )

  const defaultValues: TDefaultValue = {
    confirmNewPassword: '',
    newPassword: ''
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const onSubmit = (data: { confirmNewPassword: string; newPassword: string }) => {
    if (!Object.keys(errors)?.length) {
      dispatch(
        resetPasswordAuthAsync({
          newPassword: data.newPassword,
          secretKey
        })
      )
    }
  }

  useEffect(() => {
    if (messageResetPassword) {
      if (isSuccessResetPassword) {
        toast.success(t('Reset_password_success'))
        dispatch(resetInitialState())
        router.push(ROUTE_CONFIG.LOGIN)
      } else if (isErrorResetPassword) {
        toast.error(t('Reset_password_error'))
        dispatch(resetInitialState())
      }
    }
  }, [isSuccessResetPassword, isErrorResetPassword, messageResetPassword])
  return (
    <>
      {isLoading && <Spinner />}
      <Box
        sx={{
          height: '100%',
          width: '100%',
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
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
            src={theme.palette.mode === 'light' ? ResetPasswordLight : ResetPasswordDark}
            alt='login image'
            style={{
              height: '38%',
              width: '38%'
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography component='h1' variant='h5'>
              {t('Reset_password')}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
              <Box sx={{ mt: 2, width: '300px' }}>
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
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('Enter_new_password')}
                      error={Boolean(errors?.newPassword)}
                      helperText={errors?.newPassword?.message}
                      type={showNewPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton edge='end' onClick={() => setShowNewPassword(!showNewPassword)}>
                              {showNewPassword ? (
                                <Icon icon='material-symbols:visibility-outline' />
                              ) : (
                                <Icon icon='ic:outline-visibility-off' />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                  name='newPassword'
                />
              </Box>
              <Box sx={{ mt: 2, width: '300px' }}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('Confirm_password')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('Enter_confirm_new_password')}
                      error={Boolean(errors?.confirmNewPassword)}
                      helperText={errors?.confirmNewPassword?.message}
                      type={showConfirmNewPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton edge='end' onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
                              {showConfirmNewPassword ? (
                                <Icon icon='material-symbols:visibility-outline' />
                              ) : (
                                <Icon icon='ic:outline-visibility-off' />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                  name='confirmNewPassword'
                />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', mt: '4px' }}>
                <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, width: '300px' }}>
                  {t('Send_request')}
                </Button>
                <Button
                  startIcon={<Icon icon='uiw:left'></Icon>}
                  onClick={() => router.push(ROUTE_CONFIG.LOGIN)}
                  variant='outlined'
                  sx={{ mt: 3, mb: 2, width: '300px' }}
                >
                  {t('Back_login')}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default ResetPasswordPage
