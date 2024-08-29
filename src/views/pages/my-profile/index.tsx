// ** Next
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// ** React
import { useEffect, useState } from 'react'

// ** Mui
import { Avatar, Box, Button, FormHelperText, Grid, IconButton, InputLabel, useTheme } from '@mui/material'

// ** Components
import CustomTextField from 'src/components/text-field'
import Icon from 'src/components/Icon'
import WrapperFileUpload from 'src/components/wrapper-file-upload'

// ** form
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Config
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'

// ** Images
import IconifyIcon from 'src/components/Icon'
import { t } from 'i18next'
import { useAuth } from 'src/hooks/useAuth'

import { useTranslation } from 'react-i18next'

// ** services
import { getAuthMe } from 'src/services/auth'

// ** Utils
import { convertBase64, separationFullName, toFullName } from 'src/utils'

// ** Redux
import { resetInitialState } from 'src/stores/auth'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { updateAuthMeAsync } from 'src/stores/auth/action'

// ** component
import FallbackSpinner from 'src/components/fall-back'

// ** Other
import toast from 'react-hot-toast'
import Spinner from 'src/components/spinner'
import CustomSelect from 'src/components/custom-select'
import { getAllRoles } from 'src/services/role'

type TProps = {}

type TDefaultValue = {
  email: string
  address: string
  city: string
  phoneNumber: string
  role: string
  fullName: string
}

const MyProfilePage: NextPage<TProps> = () => {
  // State
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [optionRoles, setOptionRoles] = useState<{ label: string; value: string }[]>([])
  const [isDisabledRole, setIsDisabledRole] = useState(false)

  // ** translate
  const { i18n } = useTranslation()

  // ** redux
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, isErrorUpdateMe, messageUpdateMe, isSuccessUpdateMe } = useSelector(
    (state: RootState) => state.auth
  )

  // ** theme
  const theme = useTheme()

  const schema = yup.object().shape({
    email: yup.string().required(t('Required_field')).matches(EMAIL_REG, 'The field is must email type'),
    fullName: yup.string().notRequired(),
    phoneNumber: yup.string().required(t('Required_field')).min(8, 'The phone number is min 8 number'),
    role: isDisabledRole ? yup.string().notRequired() : yup.string().required(t('Required_field')),
    city: yup.string().notRequired(),
    address: yup.string().notRequired()
  })

  const defaultValues: TDefaultValue = {
    email: '',
    address: '',
    city: '',
    phoneNumber: '',
    role: '',
    fullName: ''
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const fetchGetAuthMe = async () => {
    setLoading(true)
    await getAuthMe()
      .then(async response => {
        setLoading(false)
        const data = response
        if (data) {
          setIsDisabledRole(!data?.role?.permissions?.length)
          reset({
            email: data.email,
            address: data.address,
            city: data.city,
            phoneNumber: data.phoneNumber,
            role: data.role.id,
            fullName: toFullName(data?.lastName, data?.middleName, data?.firstName, i18n.language)
          })
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const fetchAllRoles = async () => {
    setLoading(true)
    await getAllRoles({ params: { limit: 20, page: 1 } })
      .then(res => {
        const data = res?.data?.data.roleList
        if (data) {
          setOptionRoles(data?.map((item: { name: string; id: string }) => ({ label: item.name, value: item.id })))
        }
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchAllRoles()
  }, [])

  useEffect(() => {
    fetchGetAuthMe()
  }, [i18n.language])

  useEffect(() => {
    if (messageUpdateMe) {
      if (isErrorUpdateMe) {
        toast.error(messageUpdateMe)
      } else if (isSuccessUpdateMe) {
        toast.success(messageUpdateMe)
        fetchGetAuthMe()
      }
      dispatch(resetInitialState())
    }
  }, [isErrorUpdateMe, isSuccessUpdateMe, messageUpdateMe])
  const onSubmit = (data: any) => {
    const { firstName, lastName, middleName } = separationFullName(data.fullName, i18n.language)
    dispatch(
      updateAuthMeAsync({
        email: data.email,
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        role: data.role,
        phoneNumber: data.phoneNumber,
        address: data.address
        // city: data.city
      })
    )
  }
  const handleUploadAvatar = async (file: File) => {}

  return (
    <>
      {loading || (isLoading && <Spinner />)}
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
        <Grid container>
          <Grid
            container
            item
            md={6}
            xs={12}
            sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4 }}
          >
            <Box sx={{ height: '100%', width: '100%' }}>
              <Grid container spacing={4}>
                <Grid item md={12} xs={12}>
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 2
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      {avatar && (
                        <IconButton
                          sx={{
                            position: 'absolute',
                            bottom: -4,
                            right: -6,
                            zIndex: 2,
                            color: theme.palette.error.main
                          }}
                          edge='start'
                          color='inherit'
                          onClick={() => setAvatar('')}
                        >
                          <Icon icon='material-symbols-light:delete-outline' />
                        </IconButton>
                      )}
                      {avatar ? (
                        <Avatar src={avatar} sx={{ width: 100, height: 100 }}>
                          <Icon icon='ph:user-thin' fontSize={70} />
                        </Avatar>
                      ) : (
                        <Avatar sx={{ width: 100, height: 100 }}>
                          <Icon icon='ph:user-thin' fontSize={70} />
                        </Avatar>
                      )}
                    </Box>
                    <WrapperFileUpload
                      uploadFunc={handleUploadAvatar}
                      objectAcceptFile={{
                        'image/jpeg': ['.jpg', '.jpeg'],
                        'image/png': ['.png']
                      }}
                    >
                      <Button variant='outlined' sx={{ width: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Icon icon='ph:camera-thin'></Icon>
                        {avatar ? t('Change_avatar') : t('Upload_avatar')}
                      </Button>
                    </WrapperFileUpload>
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
                        required
                        autoFocus
                        fullWidth
                        disabled
                        label={t('Email')}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder={t('Enter_your_email')}
                        error={Boolean(errors?.email)}
                        helperText={errors?.email?.message}
                      />
                    )}
                    name='email'
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  {!isDisabledRole && (
                    <Controller
                      control={control}
                      rules={{
                        required: true
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <div>
                          <label
                            style={{
                              fontSize: '13px',
                              marginBottom: '4px',
                              display: 'block',
                              color: errors?.role
                                ? theme.palette.error.main
                                : `rgba(${theme.palette.customColors.main}, 0.42)`
                            }}
                          >
                            {t('Role')}
                          </label>
                          <CustomSelect
                            fullWidth
                            onChange={onChange}
                            options={optionRoles}
                            error={Boolean(errors?.role)}
                            onBlur={onBlur}
                            value={value}
                            placeholder={t('Enter_your_role')}
                          />
                          {!errors?.role?.message && (
                            <FormHelperText
                              sx={{
                                color: !errors?.role
                                  ? theme.palette.error.main
                                  : `rgba(${theme.palette.customColors.main}, 0.42)`
                              }}
                            >
                              {errors?.role?.message}
                            </FormHelperText>
                          )}
                        </div>
                      )}
                      name='role'
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid container item md={6} xs={12} mt={{ md: 0, xs: 5 }}>
            <Box
              sx={{
                height: '100%',
                width: '100%',
                backgroundColor: theme.palette.background.paper,
                borderRadius: '15px',
                py: 5,
                px: 4
              }}
              marginLeft={{ md: 5, xs: 0 }}
            >
              <Grid container spacing={4}>
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
                        autoFocus
                        fullWidth
                        label={t('Full_name')}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder={t('Enter_your_full_name')}
                        error={Boolean(errors?.fullName)}
                        helperText={errors?.fullName?.message}
                      />
                    )}
                    name='fullName'
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name='address'
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
                        autoFocus
                        fullWidth
                        label={t('Address')}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder={t('Enter_your_address')}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Controller
                    name='city'
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Box>
                        <InputLabel
                          sx={{
                            fontSize: '13px',
                            marginBottom: '4px',
                            display: 'block',
                            color: errors?.city
                              ? theme.palette.error.main
                              : `rgba(${theme.palette.customColors.main}, 0.42)`
                          }}
                        >
                          {t('City')}
                        </InputLabel>
                        <CustomSelect
                          fullWidth
                          onChange={onChange}
                          options={[]}
                          error={Boolean(errors?.city)}
                          onBlur={onBlur}
                          value={value}
                          placeholder={t('Enter_your_city')}
                        />
                        {!errors?.city?.message && (
                          <FormHelperText
                            sx={{
                              color: !errors?.city
                                ? theme.palette.error.main
                                : `rgba(${theme.palette.customColors.main}, 0.42)`
                            }}
                          >
                            {errors?.city?.message}
                          </FormHelperText>
                        )}
                      </Box>
                    )}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
                        required
                        autoFocus
                        fullWidth
                        label={t('Phone_number')}
                        onChange={e => {
                          const numValue = e.target.value.replace(/\D/g, '')
                          onChange(numValue)
                        }}
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9]*',
                          minLength: 8
                        }}
                        onBlur={onBlur}
                        value={value}
                        placeholder={t('Enter_your_phone')}
                        error={Boolean(errors?.phoneNumber)}
                        helperText={errors?.phoneNumber?.message}
                      />
                    )}
                    name='phoneNumber'
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
            {t('Update')}
          </Button>
        </Box>
      </form>
    </>
  )
}
export default MyProfilePage
