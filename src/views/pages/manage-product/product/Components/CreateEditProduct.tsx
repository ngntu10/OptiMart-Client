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
  InputLabel,
  MenuItem,
  Select,
  Switch,
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

// ** Redux
import { AppDispatch } from 'src/stores'
import { useDispatch } from 'react-redux'

// ** Others
import { convertBase64, convertHTMLToDraft, stringToSlug } from 'src/utils'
import { createProductAsync, updateProductAsync } from 'src/stores/product/actions'
import { getAllProductTypes } from 'src/services/product-type'
import CustomDatePicker from 'src/components/custom-date-picker'
import CustomEditor from 'src/components/custom-editor'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { getDetailsProduct } from 'src/services/product'
import { ActiveUserStyled, DeactivateUserStyled, MenuItemStyled } from 'src/views/pages/system/user/UserList'

interface TCreateEditProduct {
  open: boolean
  onClose: () => void
  idProduct?: string
}
const CreateEditProduct = (props: TCreateEditProduct) => {
  // State
  const [loading, setLoading] = useState(false)
  const [imageProduct, setImageProduct] = useState('')
  const [optionCities, setOptionTypes] = useState<{ label: string; value: string }[]>([])
  const [status, setStatus] = useState()

  // ** Props
  const { open, onClose, idProduct } = props

  // Hooks
  const theme = useTheme()
  const { t, i18n } = useTranslation()

  // ** Redux
  const dispatch: AppDispatch = useDispatch()
  const schema = yup.object().shape({
    name: yup.string().required(t('Required_field')),
    slug: yup.string().required(t('Required_field')),
    type: yup.string().required(t('Required_field')),
    countInStock: yup
      .string()
      .required(t('Required_field'))
      .test('least_count', t('least_1_in_count'), value => {
        return Number(value) >= 1
      }),
    discount: yup
      .string()
      .notRequired()
      .test('least_discount', t('least_1_in_discount'), (value, context: any) => {
        const discountStartDate = context?.parent?.discountStartDate
        const discountEndDate = context?.parent?.discountEndDate
        if (value) {
          if (!discountStartDate) {
            setError('discountStartDate', { type: 'required_start_discount', message: t('required_start_discount') })
          }
          if (!discountEndDate) {
            setError('discountEndDate', { type: 'required_end_discount', message: t('required_end_discount') })
          }
        } else {
          clearErrors('discountEndDate')
          clearErrors('discountStartDate')
        }
        return !value || Number(value) >= 1
      }),
    discountStartDate: yup
      .date()
      .notRequired()
      .test('required_start_discount', t('required_start_discount'), (value, context: any) => {
        const discount = context?.parent?.discount
        return (discount && value) || !discount
      })
      .test('less_end_discount', t('required_less_end_discount'), (value, context: any) => {
        const discountEndDate = context?.parent?.discountEndDate
        if (value && discountEndDate && discountEndDate.getTime() > value?.getTime()) {
          clearErrors('discountEndDate')
        }
        return (discountEndDate && value && discountEndDate.getTime() > value?.getTime()) || !discountEndDate
      }),
    discountEndDate: yup
      .date()
      .notRequired()
      .test('required_end_discount', t('required_end_discount'), (value, context: any) => {
        const discountStartDate = context?.parent?.discountStartDate
        return (discountStartDate && value) || !discountStartDate
      })
      .test('than_start_discount', t('required_than_start_discount'), (value, context: any) => {
        const discountStartDate = context?.parent?.discountStartDate
        if (value && discountStartDate && discountStartDate.getTime() < value?.getTime()) {
          clearErrors('discountStartDate')
        }
        return (discountStartDate && value && discountStartDate.getTime() < value?.getTime()) || !discountStartDate
      }),
    status: yup.number().required(t('Required_field')),
    description: yup.object().required(t('Required_field')),
    price: yup
      .string()
      .required(t('Required_field'))
      .test('least_count', t('least_1_in_count'), value => {
        return Number(value) >= 1000
      })
  })

  type TDefaultValue = {
    name: string
    type: string
    discount?: string
    price: string
    description: EditorState
    slug: string
    countInStock: string
    status: number
    discountEndDate: Date | null
    discountStartDate: Date | null
  }

  const defaultValues: TDefaultValue = {
    name: '',
    type: '',
    discount: '',
    description: EditorState.createEmpty(),
    slug: '',
    countInStock: '',
    price: '',
    status: 0,
    discountEndDate: null,
    discountStartDate: null
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
    console.log('data', { data })
    if (!Object.keys(errors).length) {
      if (idProduct) {
        // update
        dispatch(
          updateProductAsync({
            name: data.name,
            slug: data.slug,
            price: Number(data.price),
            discountEndDate: data?.discountEndDate || null,
            discountStartDate: data?.discountStartDate || null,
            city: data.city,
            image: imageProduct,
            type: data.type,
            discount: Number(data.discount) || 0,
            description: data.description ? draftToHtml(convertToRaw(data.description.getCurrentContent())) : '',
            status: data.status ? 1 : 0,
            id: idProduct,
            countInStock: Number(data.countInStock)
          })
        )
      } else {
        dispatch(
          createProductAsync({
            name: data.name,
            slug: data.slug,
            price: Number(data.price),
            discountEndDate: data.discountEndDate || null,
            discountStartDate: data.discountStartDate || null,
            image: imageProduct,
            type: data.type,
            city: data.city,
            discount: Number(data.discount) || 0,
            description: data.description ? draftToHtml(convertToRaw(data.description.getCurrentContent())) : '',
            status: data.status ? 1 : 0,
            countInStock: Number(data.countInStock)
          })
        )
      }
    }
  }

  const handleChangeStatus = (event: any) => {
    setStatus(event.target.value)
  }

  const handleUploadImage = async (file: File) => {
    const base64 = await convertBase64(file)
    setImageProduct(base64 as string)
  }

  // fetch
  const fetchDetailsProduct = async (id: string) => {
    setLoading(true)
    await getDetailsProduct(id)
      .then(res => {
        const data = res.data
        console.log('data', { data })
        if (data) {
          reset({
            name: data.name,
            type: data.type,
            discount: data.discount || '',
            description: data.description ? convertHTMLToDraft(data.description) : '',
            slug: data.slug,
            countInStock: data.countInStock,
            price: data.price,
            status: data.status,
            discountEndDate: data.discountEndDate || null,
            discountStartDate: data.discountStartDate || null
          })
          setImageProduct(data?.image)
        }
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
      })
  }
  const fetchAllProductTypes = async () => {
    setLoading(true)
    await getAllProductTypes({ params: { limit: -1, page: -1 } })
      .then(res => {
        console.log(res);
        const data = res?.data
        if (data) {
          setOptionTypes(data?.map((item: { name: string; id: string }) => ({ label: item.name, value: item.id })))
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
      setImageProduct('')
    } else if (idProduct && open) {
      fetchDetailsProduct(idProduct)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, idProduct])

  useEffect(() => {
    fetchAllProductTypes()
  }, [])

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
              {idProduct ? t('Edit_product') : t('Create_product')}
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
                            {imageProduct && (
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
                                onClick={() => setImageProduct('')}
                              >
                                <Icon icon='material-symbols-light:delete-outline' />
                              </IconButton>
                            )}
                            {imageProduct ? (
                              <Avatar src={imageProduct} sx={{ width: 100, height: 100 }}>
                                <Icon icon='ph:user-thin' fontSize={70} />
                              </Avatar>
                            ) : (
                              <Avatar sx={{ width: 100, height: 100 }}>
                                <Icon icon='ph:user-thin' fontSize={70} />
                              </Avatar>
                            )}
                          </Box>
                          <WrapperFileUpload
                            uploadFunc={handleUploadImage}
                            objectAcceptFile={{
                              'image/jpeg': ['.jpg', '.jpeg'],
                              'image/png': ['.png']
                            }}
                          >
                            <Button
                              variant='outlined'
                              sx={{ width: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}
                            >
                              <Icon icon='ph:camera-thin'></Icon>
                              {imageProduct ? t('Change_image_product') : t('Upload_image_product')}
                            </Button>
                          </WrapperFileUpload>
                        </Box>
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Controller
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextField
                              required
                              fullWidth
                              label={t('Name_product')}
                              onChange={e => {
                                const value = e.target.value
                                const replaced = stringToSlug(value)
                                onChange(value)
                                reset({
                                  ...getValues(),
                                  slug: replaced
                                })
                              }}
                              onBlur={onBlur}
                              value={value}
                              placeholder={t('Enter_name_product')}
                              error={Boolean(errors?.name)}
                              helperText={errors?.name?.message}
                            />
                          )}
                          name='name'
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Controller
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextField
                              required
                              disabled
                              fullWidth
                              label={t('Slug')}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                              placeholder={t('Enter_slug')}
                              error={Boolean(errors?.slug)}
                              helperText={errors?.slug?.message}
                            />
                          )}
                          name='slug'
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        {/* <Controller
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => {
                            return (
                              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <InputLabel
                                  sx={{
                                    fontSize: '13px',
                                    marginBottom: '4px',
                                    display: 'block',
                                    color: `rgba(${theme.palette.customColors.main}, 0.68)`
                                  }}
                                >
                                  {t('Status_product')}
                                </InputLabel>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      value={value}
                                      checked={Boolean(value)}
                                      onChange={e => {
                                        onChange(e.target.checked ? 1 : 0)
                                      }}
                                    />
                                  }
                                  label={Boolean(value) ? t('Public') : t('Private')}
                                />
                              </Box>
                            )
                          }}
                          name='status'
                        /> */}
                        <Controller
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => {
                            return (
                              <FormControl fullWidth>
                                <InputLabel id='demo-simple-select-label'>{t('Status')}</InputLabel>
                                <Select
                                  labelId='demo-simple-select-label'
                                  id='demo-simple-select'
                                  value={status}
                                  label='Status'
                                  onChange={handleChangeStatus}
                                >
                                  <MenuItemStyled value={1}>
                                    <ActiveUserStyled label={t('Public')} />
                                  </MenuItemStyled>
                                  <MenuItem value={0}>
                                    <DeactivateUserStyled label={t('Private')} />
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            )
                          }}
                          name='status'
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid container item md={6} xs={12}>
                  <Box>
                    <Grid container spacing={4}>
                      <Grid item md={6} xs={12}>
                        <Controller
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextField
                              required
                              fullWidth
                              label={t('Price')}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                              placeholder={t('Enter_price')}
                              error={Boolean(errors?.price)}
                              helperText={errors?.price?.message}
                            />
                          )}
                          name='price'
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Controller
                          control={control}
                          name='countInStock'
                          render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextField
                              fullWidth
                              label={t('Count_in_stock')}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                              placeholder={t('Enter_your_count')}
                              error={Boolean(errors?.countInStock)}
                              helperText={errors?.countInStock?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Controller
                          name='type'
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Box>
                              <InputLabel
                                sx={{
                                  fontSize: '13px',
                                  marginBottom: '4px',
                                  display: 'block',
                                  color: errors?.type
                                    ? theme.palette.error.main
                                    : `rgba(${theme.palette.customColors.main}, 0.68)`
                                }}
                              >
                                {t('Type_product')}
                              </InputLabel>
                              <CustomSelect
                                fullWidth
                                onChange={onChange}
                                options={optionCities}
                                error={Boolean(errors?.type)}
                                onBlur={onBlur}
                                value={value}
                                placeholder={t('Select')}
                              />
                              {errors?.type?.message && (
                                <FormHelperText
                                  sx={{
                                    color: errors?.type
                                      ? theme.palette.error.main
                                      : `rgba(${theme.palette.customColors.main}, 0.42)`
                                  }}
                                >
                                  {errors?.type?.message}
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
                              fullWidth
                              label={t('Discount(percent)')}
                              onChange={e => {
                                const numValue = e.target.value.replace(/\D/g, '')
                                onChange(numValue)
                              }}
                              inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                                minLength: 1
                              }}
                              onBlur={onBlur}
                              value={value}
                              placeholder={t('Enter_discount')}
                              error={Boolean(errors?.discount)}
                              helperText={errors?.discount?.message}
                            />
                          )}
                          name='discount'
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Controller
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <CustomDatePicker
                              required
                              minDate={new Date()}
                              onChange={(date: Date | null) => {
                                console.log(date);
                                onChange(date)
                              }}
                              label={`${t('Start_date_discount')}`}
                              onBlur={onBlur}
                              selectedDate={value}
                              placeholder={t('Select')}
                              error={Boolean(errors?.discountStartDate)}
                              helperText={errors?.discountStartDate?.message}
                            />
                          )}
                          name='discountStartDate'
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Controller
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <CustomDatePicker
                              required
                              onChange={(date: Date | null) => {
                                onChange(date)
                              }}
                              label={`${t('End_date_discount')}`}
                              onBlur={onBlur}
                              selectedDate={value}
                              placeholder={t('Select')}
                              error={Boolean(errors?.discountEndDate)}
                              helperText={errors?.discountEndDate?.message}
                            />
                          )}
                          name='discountEndDate'
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Controller
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <CustomEditor
                              onEditorStateChange={onChange}
                              label={`${t('Description')}`}
                              onBlur={onBlur}
                              editorState={value as EditorState}
                              placeholder={t('Enter_your_description')}
                              error={Boolean(errors?.description)}
                              helperText={errors?.description?.message}
                            />
                          )}
                          name='description'
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
                {!idProduct ? t('Create') : t('Update')}
              </Button>
            </Box>
          </form>
        </Box>
      </CustomModal>
    </>
  )
}
export default CreateEditProduct
