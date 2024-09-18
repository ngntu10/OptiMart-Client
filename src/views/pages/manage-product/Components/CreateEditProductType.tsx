// ** React
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Form
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

// ** Mui
import { Box, Button, Grid, IconButton, Typography, useTheme } from '@mui/material'

// ** Component
import Icon from 'src/components/Icon'
import CustomModal from 'src/components/custom-modal'
import Spinner from 'src/components/spinner'
import CustomTextField from 'src/components/text-field'

// ** Services
import { getDetailsProductType } from 'src/services/product-type'

// ** Redux
import { AppDispatch } from 'src/stores'
import { useDispatch } from 'react-redux'
import { createProductTypeAsync, updateProductTypeAsync } from 'src/stores/product-type/actions'

// ** Other
import { stringToSlug } from 'src/utils'

interface TCreateEditProductType {
  open: boolean
  onClose: () => void
  idProductType?: string
}

type TDefaultValue = {
  name: string
  slug: string
}

const CreateEditProductType = (props: TCreateEditProductType) => {
  // State
  const [loading, setLoading] = useState(false)

  // ** Props
  const { open, onClose, idProductType } = props

  // Hooks
  const theme = useTheme()
  const { t, i18n } = useTranslation()

  // ** Redux
  const dispatch: AppDispatch = useDispatch()

  const schema = yup.object().shape({
    name: yup.string().required(t('Required_field')),
    slug: yup.string().required(t('Required_field'))
  })

  const defaultValues: TDefaultValue = {
    name: '',
    slug: ''
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // handle
  const onSubmit = (data: TDefaultValue) => {
    if (!Object.keys(errors).length) {
      if (idProductType) {
        // update
        dispatch(
          updateProductTypeAsync({
            name: data.name,
            slug: data.slug,
            id: idProductType
          })
        )
      } else {
        dispatch(
          createProductTypeAsync({
            name: data.name,
            slug: data.slug
          })
        )
      }
    }
  }

  // fetch
  const fetchDetailsProductType = async (id: string) => {
    setLoading(true)
    await getDetailsProductType(id)
      .then(res => {
        const data = res.data
        if (data) {
          reset({
            name: data?.name,
            slug: data?.slug
          })
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
    } else if (idProductType && open) {
      fetchDetailsProductType(idProductType)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, idProductType])

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
          minWidth={{ md: '500px', xs: '80vw' }}
          maxWidth={{ md: '50vw', xs: '80vw' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative', paddingBottom: '20px' }}>
            <Typography variant='h4' sx={{ fontWeight: 600 }}>
              {' '}
              {idProductType ? t('Edit_product_type') : t('Create_product_type')}
            </Typography>
            <IconButton sx={{ position: 'absolute', top: '-4px', right: '-10px' }} onClick={onClose}>
              <Icon icon='material-symbols-light:close' fontSize={'30px'} />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
            <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4 }}>
              <Grid container item md={12} xs={12}>
                <Grid item md={12} xs={12} mb={2}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
                        required
                        fullWidth
                        label={t('Name_product_type')}
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
                        placeholder={t('Enter_name_product_type')}
                        error={Boolean(errors?.name)}
                        helperText={errors?.name?.message}
                      />
                    )}
                    name='name'
                  />
                </Grid>
                <Grid item md={12} xs={12} mb={2}>
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
              </Grid>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
                {!idProductType ? t('Create') : t('Update')}
              </Button>
            </Box>
          </form>
        </Box>
      </CustomModal>
    </>
  )
}

export default CreateEditProductType
