// ** React
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Form
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

// ** Mui
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Theme,
  Typography,
  useTheme
} from '@mui/material'

// ** Component
import Icon from 'src/components/Icon'
import CustomModal from 'src/components/custom-modal'
import Spinner from 'src/components/spinner'
import CustomTextField from 'src/components/text-field'
import WrapperFileUpload from 'src/components/wrapper-file-upload'
import CustomSelect from 'src/components/custom-select'

// ** Services
import { getDetailsUser } from 'src/services/user'
import { getAllCities } from 'src/services/city'

// ** Redux
import { AppDispatch } from 'src/stores'
import { createUserAsync, updateUserAsync } from 'src/stores/user/actions'
import { useDispatch } from 'react-redux'

// ** Others
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import { convertBase64, separationFullName, toFullName } from 'src/utils'
import { getAllRoles } from 'src/services/role'
import { ActiveUserStyled, DeactivateUserStyled, MenuItemStyled } from '../UserList'

interface TCreateEditUser {
  open: boolean
  onClose: () => void
  status?: number
  idUser?: string
}

type TDefaultValue = {
  password?: string
  fullName: string
  email: string
  role: string
  phoneNumber: string
  address?: string
  status?: number
  city?: string
  imageUrl?: string
}

const CreateEditUser = (props: TCreateEditUser) => {
  // State
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [optionRoles, setOptionRoles] = useState<{ label: string; value: string }[]>([])
  const [showPassword, setShowPassword] = useState(false)
  const [roleSelected, setRoleSelected] = useState('')
  const [status, setStatus] = useState()
  const [citySelected, setCitySelected] = useState('')
  const [optionCities, setOptionCities] = useState<{ label: string; value: string }[]>([])

  // ** Props
  const { open, onClose, idUser } = props

  // Hooks
  const theme = useTheme()
  const { t, i18n } = useTranslation()

  // ** Redux
  const dispatch: AppDispatch = useDispatch()

  const schema = yup.object().shape({
    email: yup.string().required(t('Required_field')).matches(EMAIL_REG, t('Rules_email')),
    password: idUser
      ? yup.string().nonNullable()
      : yup.string().required(t('Required_field')).matches(PASSWORD_REG, t('Rules_password')),
    fullName: yup.string().required(t('Required_field')),
    phoneNumber: yup.string().required(t('Required_field')).min(9, 'The phone number is min 9 number'),
    role: yup.string().required(t('Required_field')),
    city: yup.string().nonNullable(),
    address: yup.string().nonNullable(),
    status: yup.number().nonNullable()
  })

  const names = [t('Active_user'), t('Locked_user')]

  const defaultValues: TDefaultValue = {
    fullName: '',
    email: '',
    role: '',
    phoneNumber: '',
    address: '',
    status: status,
    city: '',
    imageUrl: ''
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // handle
  const onSubmit = (data: TDefaultValue) => {
    if (!Object.keys(errors).length) {
      const { firstName, lastName, middleName } = separationFullName(data.fullName, i18n.language)
      if (idUser) {
        // update
        dispatch(
          updateUserAsync({
            firstName,
            lastName,
            middleName,
            phoneNumber: data.phoneNumber,
            role: data?.role,
            email: data?.email,
            city: data?.city,
            address: data?.address,
            id: idUser,
            status: status
          })
        )
      } else {
        dispatch(
          createUserAsync({
            firstName,
            lastName,
            middleName,
            password: data?.password ? data?.password : '',
            phoneNumber: data.phoneNumber,
            role: data?.role,
            email: data.email,
            city: data.city,
            address: data?.address
          })
        )
      }
    }
  }

  const fetchAllRoles = async () => {
    setLoading(true)
    await getAllRoles({ params: { limit: 20, page: 1 } })
      .then(res => {
        const data = res?.data?.data?.roleList
        if (data) {
          setOptionRoles(data?.map((item: { name: string; id: string }) => ({ label: item.name, value: item.name })))
        }
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
      })
  }

  const fetchAllCities = async () => {
    setLoading(true)
    await getAllCities({ params: { limit: -1, page: -1 } })
      .then(res => {
        const data = res?.data
        if (data) {
          setOptionCities(data?.map((item: { name: string; id: string }) => ({ label: item.name, value: item.name })))
        }
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
      })
  }

  const handleChangeStatus = (event: any) => {
    setStatus(event.target.value)
  }

  useEffect(() => {
    fetchAllCities()
    fetchAllRoles()
  }, [])

  // fetch
  const fetchDetailsUser = async (id: string) => {
    fetchAllRoles()
    setLoading(true)
    await getDetailsUser(id)
      .then(res => {
        const data = res.data
        if (data) {
          reset({
            fullName: toFullName(data?.lastName, data?.middleName, data?.firstName, i18n.language),
            phoneNumber: data?.phoneNumber,
            role: data?.role?.name,
            email: data.email,
            city: data?.city?.id,
            address: data?.address,
            status: data?.status
          })  
          setCitySelected(data.city.name)
          setRoleSelected(data?.role?.name)
          setAvatar(data?.imageUrl)
          setStatus(data?.status)
        }
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!open) {
      reset({
        ...defaultValues
      })
      setAvatar('')
      setShowPassword(false)
    } else if (idUser && open) {
      fetchDetailsUser(idUser)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, idUser])

  return (
    <>
      {loading && <Spinner />}
      <CustomModal open={open} onClose={onClose}>
        <Box
          sx={{
            padding: '20px',
            borderRadius: '15px',
            backgroundColor: theme.palette.customColors.bodyBg
          }}
          minWidth={{ md: '800px', xs: '80vw' }}
          maxWidth={{ md: '80vw', xs: '80vw' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative', paddingBottom: '20px' }}>
            <Typography variant='h4' sx={{ fontWeight: 600 }}>
              {' '}
              {idUser ? t('Edit_user') : t('Create_user')}
            </Typography>
            <IconButton sx={{ position: 'absolute', top: '-4px', right: '-10px' }} onClick={onClose}>
              <Icon icon='material-symbols-light:close' fontSize={'30px'} />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
            <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4 }}>
              <Grid container spacing={5}>
                <Grid container item md={6} xs={12}>
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
                              disabled={!!idUser}
                              fullWidth
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
                                {t('Role')}{' '}
                                <span
                                  style={{
                                    color: errors?.role
                                      ? theme.palette.error.main
                                      : `rgba(${theme.palette.customColors.main}, 0.42)`
                                  }}
                                >
                                  *
                                </span>
                              </label>
                              <Box sx={{ width: '200px' }}>
                                <CustomSelect
                                  fullWidth
                                  onChange={e => {
                                    setRoleSelected(String(e.target.value))
                                    setValue('role', String(e.target.value))
                                  }}
                                  options={optionRoles}
                                  value={value}
                                  placeholder={t('Role')}
                                />
                              </Box>
                              {errors?.role && (
                                <FormHelperText
                                  sx={{
                                    color: errors?.role
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
                      </Grid>
                      {!idUser && (
                        <Grid item md={6} xs={12}>
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
                                placeholder={t('Enter_password')}
                                error={Boolean(errors?.password)}
                                helperText={errors?.password?.message}
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position='end'>
                                      <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? (
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
                            name='password'
                          />
                        </Grid>
                      )}
                      {idUser && (
                        <Grid item md={6} xs={12}>
                          <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => {
                              return (
                                <FormControl fullWidth>
                                  <InputLabel id='demo-simple-select-label'>Status</InputLabel>
                                  <Select
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={status}
                                    label='Status'
                                    onChange={handleChangeStatus}
                                  >
                                    <MenuItemStyled value={1}>
                                      <ActiveUserStyled label={t('Active')} />
                                    </MenuItemStyled>
                                    <MenuItem value={0}>
                                      <DeactivateUserStyled label={t('Blocking')} />
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              )
                            }}
                            name='status'
                          />
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </Grid>
                <Grid container item md={6} xs={12}>
                  <Box>
                    <Grid container spacing={4}>
                      <Grid item md={12} xs={12}>
                        <Controller
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextField
                              required
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
                      <Grid item md={12} xs={12}>
                        <Controller
                          control={control}
                          name='address'
                          render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextField
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
                      <Grid item md={12} xs={12}>
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
                                onChange={e => {
                                  setCitySelected(String(e.target.value))
                                  setValue('city', String(e.target.value))
                                }}
                                options={optionCities}
                                error={Boolean(errors?.city)}
                                value={citySelected}
                                placeholder={t('Enter_your_city')}
                                MenuProps={{
                                  PaperProps: {
                                    style: {
                                      maxHeight: 180
                                    }
                                  }
                                }}
                              />
                              {errors?.city?.message && (
                                <FormHelperText
                                  sx={{
                                    color: errors?.city
                                      ? theme.palette.error.main
                                      : `rgba(${theme.palette.customColors.main}, 0.42)`
                                  }}
                                >
                                  {/* {errors?.city?.message} */}
                                </FormHelperText>
                              )}
                            </Box>
                          )}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Controller
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextField
                              required
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
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
                {!idUser ? t('Create') : t('Update')}
              </Button>
            </Box>
          </form>
        </Box>
      </CustomModal>
    </>
  )
}

export default CreateEditUser
