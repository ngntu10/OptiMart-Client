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
import { getDetailsDeliveryType } from 'src/services/delivery-type'

// ** Redux
import { AppDispatch } from 'src/stores'
import { useDispatch } from 'react-redux'
import { createDeliveryTypeAsync, updateDeliveryTypeAsync } from 'src/stores/delivery-type/actions'

interface TCreateEditDeliveryType {
  open: boolean
  onClose: () => void
  idDeliveryType?: string
}

type TDefaultValue = {
  name: string
}

const CreateEditDeliveryType = (props: TCreateEditDeliveryType) => {
  // State
  const [loading, setLoading] = useState(false)

  // ** Props
  const { open, onClose, idDeliveryType } = props

  // Hooks
  const theme = useTheme()
  const { t, i18n } = useTranslation()

  // ** Redux
  const dispatch: AppDispatch = useDispatch()

  const schema = yup.object().shape({
    name: yup.string().required(t('Required_field'))
  })

  const defaultValues: TDefaultValue = {
    name: ''
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
      if (idDeliveryType) {
        // update
        dispatch(
          updateDeliveryTypeAsync({
            name: data.name,
            id: idDeliveryType
          })
        )
      } else {
        dispatch(
          createDeliveryTypeAsync({
            name: data.name
          })
        )
      }
    }
  }

  // fetch
  const fetchDetailsDeliveryType = async (id: string) => {
    setLoading(true)
    await getDetailsDeliveryType(id)
      .then(res => {
        const data = res.data
        if (data) {
          reset({
            name: data?.name
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
    } else if (idDeliveryType && open) {
      fetchDetailsDeliveryType(idDeliveryType)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, idDeliveryType])

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
              {idDeliveryType ? t('Edit_delivery_type') : t('Create_delivery_type')}
            </Typography>
            <IconButton sx={{ position: 'absolute', top: '-4px', right: '-10px' }} onClick={onClose}>
              <Icon icon='material-symbols-light:close' fontSize={'30px'} />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
            <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4 }}>
              <Grid container item md={12} xs={12}>
                <Grid item md={12} xs={12}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
                        required
                        fullWidth
                        label={t('Name_delivery_type')}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder={t('Enter_name_delivery_type')}
                        error={Boolean(errors?.name)}
                        helperText={errors?.name?.message}
                      />
                    )}
                    name='name'
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
                {!idDeliveryType ? t('Create') : t('Update')}
              </Button>
            </Box>
          </form>
        </Box>
      </CustomModal>
    </>
  )
}

export default CreateEditDeliveryType
