// ** React
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Form
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

// ** Mui
import { Box, Button, FormHelperText, Grid, IconButton, Typography, useTheme } from '@mui/material'

// ** Component
import Icon from 'src/components/Icon'
import CustomModal from 'src/components/custom-modal'
import Spinner from 'src/components/spinner'
import CustomTextField from 'src/components/text-field'

// ** Services
import { getDetailsPaymentType } from 'src/services/payment-type'

// ** Redux
import { AppDispatch } from 'src/stores'
import { useDispatch } from 'react-redux'
import { createPaymentTypeAsync, updatePaymentTypeAsync } from 'src/stores/payment-type/actions'
import CustomSelect from 'src/components/custom-select'
import { PAYMENT_TYPES } from 'src/configs/payment'

interface TCreateEditPaymentType {
  open: boolean
  onClose: () => void
  idPaymentType?: string
}

type TDefaultValue = {
  name: string
  type: string
}

const CreateEditPaymentType = (props: TCreateEditPaymentType) => {
  // State
  const [loading, setLoading] = useState(false)
  const ObjectPaymentType = PAYMENT_TYPES()

  // ** Props
  const { open, onClose, idPaymentType } = props

  // Hooks
  const theme = useTheme()
  const { t, i18n } = useTranslation()

  // ** Redux
  const dispatch: AppDispatch = useDispatch()

  const schema = yup.object().shape({
    name: yup.string().required(t('Required_field')),
    type: yup.string().required(t('Required_field'))
  })

  const defaultValues: TDefaultValue = {
    name: '',
    type: ''
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // handle
  const onSubmit = (data: TDefaultValue) => {
    if (!Object.keys(errors).length) {
      if (idPaymentType) {
        // update
        dispatch(
          updatePaymentTypeAsync({
            name: data.name,
            type: data.type,
            id: idPaymentType
          })
        )
      } else {
        dispatch(
          createPaymentTypeAsync({
            name: data.name,
            type: data.type
          })
        )
      }
    }
  }

  // fetch
  const fetchDetailsPaymentType = async (id: string) => {
    setLoading(true)
    await getDetailsPaymentType(id)
      .then(res => {
        const data = res.data
        if (data) {
          reset({
            name: data?.name,
            type: data?.type
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
    } else if (idPaymentType && open) {
      fetchDetailsPaymentType(idPaymentType)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, idPaymentType])

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
              {idPaymentType ? t('Edit_payment_type') : t('Create_payment_type')}
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
                        label={t('type_payment_type')}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder={t('Enter_name_payment_type')}
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
                            color: errors?.type
                              ? theme.palette.error.main
                              : `rgba(${theme.palette.customColors.main}, 0.42)`
                          }}
                        >
                          {t('Type')}{' '}
                          <span
                            style={{
                              color: errors?.type
                                ? theme.palette.error.main
                                : `rgba(${theme.palette.customColors.main}, 0.42)`
                            }}
                          >
                            *
                          </span>
                        </label>
                        <CustomSelect
                          fullWidth
                          onChange={onChange}
                          options={Object.values(ObjectPaymentType)}
                          error={Boolean(errors?.type)}
                          onBlur={onBlur}
                          value={value}
                          placeholder={t('Select')}
                        />
                        {errors?.type && (
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
                      </div>
                    )}
                    name='type'
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
                {!idPaymentType ? t('Create') : t('Update')}
              </Button>
            </Box>
          </form>
        </Box>
      </CustomModal>
    </>
  )
}

export default CreateEditPaymentType
