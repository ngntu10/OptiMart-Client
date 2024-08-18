// ** Next
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'

// ** React
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import { Box, Button, CssBaseline, IconButton, InputAdornment, Typography, useTheme } from '@mui/material'

// ** Components
import CustomTextField from 'src/components/text-field'
import Icon from 'src/components/Icon'

// ** form
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Config
import { PASSWORD_REG } from 'src/configs/regex'

// ** Images
import RegisterDark from '/public/images/register-dark.png'
import RegisterLight from '/public/images/register-light.png'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { resetInitialState } from 'src/stores/apps/auth'

// ** Components
import FallbackSpinner from 'src/components/fall-back'

// ** Others
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'
import { changePasswordMeAsync } from 'src/stores/apps/auth/action'

type TProps = {}

type TDefaultValue = {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

const ChangePasswordPage: NextPage<TProps> = () => {
  // State
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)

  // ** router
  const router = useRouter()

  // ** auth
  const { logout } = useAuth()

  // ** Translate
  const { t } = useTranslation()

  /// ** redux
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, isErrorChangePassword, isSuccessChangePassword, messageChangePassword } = useSelector(
    (state: RootState) => state.auth
  )

  // ** theme
  const theme = useTheme()

  const schema = yup.object().shape({
    currentPassword: yup
      .string()
      .required('The field is required')
      .matches(PASSWORD_REG, 'The password is contain charactor, special character, number'),
    newPassword: yup
      .string()
      .required('The field is required')
      .matches(PASSWORD_REG, 'The password is contain charactor, special character, number'),
    confirmNewPassword: yup
      .string()
      .required('The field is required')
      .matches(PASSWORD_REG, 'The password is contain charactor, special character, number')
      .oneOf([yup.ref('newPassword'), ''], 'The confirm is must match with password')
  })

  const defaultValues: TDefaultValue = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  }

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: { currentPassword: string; newPassword: string }) => {
    if (!Object.keys(errors).length) {
      dispatch(changePasswordMeAsync({ currentPassword: data.currentPassword, newPassword: data.newPassword }))
    }
  }

  useEffect(() => {
    if (messageChangePassword) {
      console.log(messageChangePassword)  
      if (isErrorChangePassword) {
        toast.error(messageChangePassword)
      } else if (isSuccessChangePassword) {
        toast.success(messageChangePassword)
        setTimeout(() => {
          logout()
        }, 100)
      }   
      console.log("reset...");
      dispatch(resetInitialState())
    }
  }, [isErrorChangePassword, isSuccessChangePassword, messageChangePassword])

  return (
    <>
      {isLoading && <FallbackSpinner />}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          padding: '40px'
        }}
      >
        <Box
          display={{
            xs: 'none',
            sm: 'flex'
          }}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.customColors.bodyBg,
            height: '100%',
            minWidth: '50vw'
          }}
        >
          <Image
            src={theme.palette.mode === 'light' ? RegisterLight : RegisterDark}
            alt='login image'
            style={{
              height: '74vh',
              width: 'auto'
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
              //   marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography component='h1' variant='h5'>
              {t('Change_password')}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
              <Box sx={{ mt: 5, width: '370px', mb: 2 }}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      autoFocus
                      label={t('Current_password')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder='Input password'
                      error={Boolean(errors?.currentPassword)}
                      helperText={errors?.currentPassword?.message}
                      type={showCurrentPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton edge='end' onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                              {showCurrentPassword ? (
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
                  name='currentPassword'
                />
              </Box>

              <Box sx={{ mt: 5, width: '370px', mb: 2 }}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      autoFocus
                      label={t('New_password')}
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

              <Box sx={{ mt: 5, width: '370px', mb: 2 }}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      autoFocus
                      label={t('Confirm_new_password')}
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

              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                {t('Change')}
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ChangePasswordPage
