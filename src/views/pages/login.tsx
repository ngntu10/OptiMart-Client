/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Head from 'next/head'
import { NextPage } from 'next'
import CustomTextField from 'src/components/text-field'
import { Controller, useForm } from 'react-hook-form'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  ThemeProvider,
  Typography
} from '@mui/material'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import { useState } from 'react'
import IconifyIcon from 'src/components/Icon'
import { Icon } from '@iconify/react/dist/iconify.js'

type Tprops = {}

const LoginPage: NextPage<Tprops> = () => {
  const [showPassword, setShowPassword] = useState(false)
  const schema = yup
    .object()
    .shape({
      email: yup.string().required('This field is required').matches(EMAIL_REG, 'Must be email type'),
      password: yup
        .string()
        .required('This field is required')
        .matches(PASSWORD_REG, 'Alphanumeric with special characters')
    })
    .required()

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  console.log({ errors })
  const onSubmit = (data: { email: string; password: string }) => {
    console.log(data)
  }

  return (
    <Container component='main' maxWidth='xs'>
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
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
          <Box sx={{ mt: 2 }}>
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextField
                  required
                  fullWidth
                  label='Email'
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  placeholder='Email'
                  error={Boolean(errors?.email)}
                  helperText={errors?.email?.message}
                />
              )}
              name='email'
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextField
                  required
                  fullWidth
                  label='Password'
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  placeholder='Password'
                  error={Boolean(errors?.password)}
                  helperText={errors?.password?.message}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={() => {
                            setShowPassword(!showPassword)
                          }}
                        >
                          {showPassword ? (
                            <Icon icon='material-symbols:visibility' />
                          ) : (
                            <Icon icon='material-symbols:visibility-off-rounded' />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
              name='password'
            />
          </Box>
          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  )
}

export default LoginPage
