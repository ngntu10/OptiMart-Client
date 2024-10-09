// ** React
import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// ** Form
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
// ** Mui
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  Radio,
  RadioGroup,
  Typography,
  useTheme
} from '@mui/material'
// ** Component
import Icon from 'src/components/Icon'
import CustomModal from 'src/components/custom-modal'
import Spinner from 'src/components/spinner'
import CustomTextField from 'src/components/text-field'
import CustomSelect from 'src/components/custom-select'
import NoData from 'src/components/no-data'
// ** Services
import { getAllCities } from 'src/services/city'
// ** Redux
import { AppDispatch, RootState } from 'src/stores'
import { useDispatch, useSelector } from 'react-redux'
import { resetInitialState } from 'src/stores/auth'
// ** Others
import { cloneDeep, separationFullName, toFullName } from 'src/utils'
import { TUserAddresses } from 'src/contexts/types'
import toast from 'react-hot-toast'
// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { updateAuthMeAsync } from 'src/stores/auth/action'
interface TModalAddAddress {
  open: boolean
  onClose: () => void
}
type TDefaultValue = {
  address: string
  city: string
  phoneNumber: string
  fullName: string
}
const ModalAddAddress = (props: TModalAddAddress) => {
  // State
  const [loading, setLoading] = useState(false)
  const [optionCities, setOptionCities] = useState<{ label: string; value: string }[]>([])
  const [activeTab, setActiveTab] = useState(1)
  const [addresses, setAddresses] = useState<TUserAddresses[]>([])
  const [isEdit, setIsEdit] = useState({
    isEdit: false,
    index: 0
  })
  // ** Props
  const { open, onClose } = props
  // Hooks
  const theme = useTheme()
  const { t, i18n } = useTranslation()
  const { user, setUser } = useAuth()
  // ** Redux
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, isErrorUpdateMe, messageUpdateMe, isSuccessUpdateMe } = useSelector(
    (state: RootState) => state.auth
  )
  const schema = yup.object().shape({
    fullName: yup.string().required(t('Required_field')),
    phoneNumber: yup.string().required(t('Required_field')).min(9, 'The phone number is min 9 number'),
    city: yup.string().required(t('Required_field')),
    address: yup.string().required(t('Required_field'))
  })
  const defaultValues: TDefaultValue = {
    address: '',
    city: '',
    phoneNumber: '',
    fullName: ''
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
    setError,
    clearErrors
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  // handle
  const onSubmit = (data: any) => {
    if (!Object.keys(errors).length) {
      if (activeTab === 2) {
        const isHaveDefault = addresses.some(item => item.isDefault)
        const { firstName, lastName, middleName } = separationFullName(data.fullName, i18n.language)
        if (isEdit.isEdit) {
          const cloneAddresses = cloneDeep(addresses)
          const findAddress = cloneAddresses[isEdit.index]
          if (findAddress) {
            findAddress.address = data.address
            findAddress.city = data.city
            findAddress.firstName = firstName
            findAddress.lastName = lastName
            findAddress.middleName = middleName
            findAddress.phoneNumber = data.phoneNumber
          }
          setAddresses(cloneAddresses)
        } else {
          setAddresses([
            ...addresses,
            {
              firstName,
              lastName,
              middleName,
              address: data.address,
              city: data.city,
              isDefault: !isHaveDefault,
              phoneNumber: data.phoneNumber
            }
          ])
        }
        setIsEdit({
          isEdit: false,
          index: 0
        })
        setActiveTab(1)
      }
    }
  }
  const onChangeAddress = (value: string) => {
    const cloneAddresses = [...addresses]
    setAddresses(
      cloneAddresses.map((add, index) => {
        return {
          ...add,
          isDefault: +value === index
        }
      })
    )
  }
  // fetch api
  const fetchAllCities = async () => {
    setLoading(true)
    await getAllCities({ params: { limit: -1, page: -1 } })
      .then(res => {
        const data = res?.data.cities
        if (data) {
          setOptionCities(data?.map((item: { name: string; _id: string }) => ({ label: item.name, value: item._id })))
        }
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
      })
  }
  const handleUpdateAddress = () => {
    dispatch(
      updateAuthMeAsync({
        ...user,
        addresses: addresses
      })
    )
  }
  useEffect(() => {
    if (!open) {
      reset({
        ...defaultValues
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])
  useEffect(() => {
    if (activeTab === 2 && isEdit.isEdit) {
      const findDefault = addresses.find(item => item.isDefault)
      const findCity = findDefault ? optionCities.find(item => findDefault.city === item.label) : ''
      const fullName = toFullName(
        findDefault?.lastName || '',
        findDefault?.middleName || '',
        findDefault?.firstName || '',
        i18n.language
      )
      reset({
        fullName: fullName,
        phoneNumber: findDefault?.phoneNumber,
        address: findDefault?.address,
        city: findCity ? findCity?.value : ''
      })
    } else {
      reset({
        ...defaultValues
      })
    }
  }, [activeTab])
  useEffect(() => {
    if (messageUpdateMe) {
      if (isErrorUpdateMe) {
        toast.error(messageUpdateMe)
      } else if (isSuccessUpdateMe) {
        toast.success(messageUpdateMe)
        if (user) {
          setUser({ ...user, addresses })
        }
      }
      dispatch(resetInitialState())
      onClose()
    }
  }, [isErrorUpdateMe, isSuccessUpdateMe, messageUpdateMe])
  useEffect(() => {
    fetchAllCities()
  }, [])
  useEffect(() => {
    if (user) {
      setAddresses(user?.addresses)
    }
  }, [user?.addresses])
  return (
    <>
      {(isLoading || loading) && <Spinner />}
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
              {activeTab === 1 ? <>{t('Address_shipping')}</> : <>{t('Add_address')}</>}
            </Typography>
            <IconButton sx={{ position: 'absolute', top: '-4px', right: '-10px' }} onClick={onClose}>
              <Icon icon='material-symbols-light:close' fontSize={'30px'} />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
            <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4 }}>
              {activeTab === 1 ? (
                <Box>
                  {addresses.length > 0 ? (
                    <FormControl sx={{}}>
                      <FormLabel
                        sx={{ color: theme.palette.primary.main, fontWeight: 600, width: '260px', mb: 2 }}
                        id='address-group'
                      >
                        {t('Select_address_shipping')}
                      </FormLabel>
                      <RadioGroup
                        sx={{ position: 'relative', top: '-6px' }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeAddress(e.target.value)}
                        aria-labelledby='address-group'
                        name='radio-address-group'
                      >
                        {addresses.map((address, index) => {
                          const findCity = optionCities.find(item => item.value === address.city)
                          return (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <FormControlLabel
                                value={index}
                                control={<Radio checked={address.isDefault} />}
                                label={`${toFullName(
                                  address?.lastName || '',
                                  address?.middleName || '',
                                  address?.firstName || '',
                                  i18n.language
                                )} ${address.phoneNumber} ${address.address} ${findCity?.label}`}
                              />
                              {address.isDefault && (
                                <Button
                                  sx={{ border: `1px solid ${theme.palette.primary.main}` }}
                                  onClick={() => {
                                    setActiveTab(2)
                                    setIsEdit({
                                      isEdit: true,
                                      index: index
                                    })
                                  }}
                                >
                                  {t('Change_address')}
                                </Button>
                              )}
                            </Box>
                          )
                        })}
                      </RadioGroup>
                    </FormControl>
                  ) : (
                    <NoData widthImage='60px' heightImage='60px' textNodata={t('No_address_shipping')} />
                  )}
                  <Box>
                    {' '}
                    <Button
                      disabled={addresses.length > 3}
                      sx={{ border: `1px solid ${theme.palette.primary.main}`, mt: 3, mb: 2 }}
                      onClick={() => setActiveTab(2)}
                    >
                      {t('Add_new')}
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Grid container spacing={5}>
                  <Grid item md={6} xs={12}>
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextField
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
                          fullWidth
                          label={t('Address')}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          placeholder={t('Enter_your_address')}
                          error={Boolean(errors?.address)}
                          helperText={errors?.address?.message}
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
                            options={optionCities}
                            error={Boolean(errors?.city)}
                            onBlur={onBlur}
                            value={value}
                            placeholder={t('Enter_your_city')}
                          />
                          {errors?.city?.message && (
                            <FormHelperText
                              sx={{
                                color: errors?.city
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
              )}
            </Box>
            {activeTab === 1 ? (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleUpdateAddress} variant='contained' sx={{ mt: 3, mb: 2 }}>
                  {t('Update')}
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
                <Button
                  sx={{ border: `1px solid ${theme.palette.primary.main}`, mt: 3, mb: 2 }}
                  onClick={() => {
                    setActiveTab(1)
                    setIsEdit({
                      isEdit: false,
                      index: 0
                    })
                  }}
                >
                  {t('Cancel')}
                </Button>
                <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
                  {t('Confirm')}
                </Button>
              </Box>
            )}
          </form>
        </Box>
      </CustomModal>
    </>
  )
}
export default ModalAddAddress