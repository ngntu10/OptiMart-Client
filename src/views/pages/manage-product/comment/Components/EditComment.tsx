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
import { getDetailsComment } from 'src/services/commentProduct'

// ** Redux
import { AppDispatch } from 'src/stores'
import { useDispatch } from 'react-redux'
import { updateCommentAsync } from 'src/stores/comment/actions'

interface TEditComment {
  open: boolean
  onClose: () => void
  idComment?: string
}

type TDefaultValue = {
  content: string
}

const EditComment = (props: TEditComment) => {
  // State
  const [loading, setLoading] = useState(false)

  // ** Props
  const { open, onClose, idComment } = props

  // Hooks
  const theme = useTheme()
  const { t, i18n } = useTranslation()

  // ** Redux
  const dispatch: AppDispatch = useDispatch()

  const schema = yup.object().shape({
    content: yup.string().required(t('Required_field'))
  })

  const defaultValues: TDefaultValue = {
    content: ''
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
      // update
      if (idComment) {
        dispatch(
          updateCommentAsync({
            id: idComment,
            content: data.content
          })
        )
      }
    }
  }

  // fetch api
  const fetchDetailsComment = async (id: string) => {
    setLoading(true)
    await getDetailsComment(id)
      .then(res => {
        const data = res.data
        if (data) {
          reset({
            content: data?.content
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
    } else if (idComment && open) {
      fetchDetailsComment(idComment)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, idComment])

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
          minWidth={{ md: '400px', xs: '80vw' }}
          maxWidth={{ md: '40vw', xs: '80vw' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative', paddingBottom: '20px' }}>
            <Typography variant='h4' sx={{ fontWeight: 600 }}>
              {' '}
              {t('Edit_comment')}
            </Typography>
            <IconButton sx={{ position: 'absolute', top: '-4px', right: '-10px' }} onClick={onClose}>
              <Icon icon='material-symbols-light:close' fontSize={'30px'} />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
            <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4 }}>
              <Grid container spacing={5}>
                <Grid container item md={12} xs={12}>
                  <Box sx={{ height: '100%', width: '100%' }}>
                    <Grid container spacing={4}>
                      <Grid item md={12} xs={12}>
                        <Controller
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextField
                              fullWidth
                              required
                              label={t('Content')}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                              placeholder={t('Enter_content')}
                              error={Boolean(errors?.content)}
                              helperText={errors?.content?.message}
                            />
                          )}
                          name='content'
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
                {t('Update')}
              </Button>
            </Box>
          </form>
        </Box>
      </CustomModal>
    </>
  )
}

export default EditComment
