import { ModalProps, styled, Modal, Box, BoxProps, FormHelperText, useTheme, InputLabel } from '@mui/material'
import React, { useRef, useState } from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Icon from 'src/components/Icon'
interface TCustomDatePicker extends ReactDatePickerProps {
  selectedDate?: Date | null
  placeholder?: string
  error?: boolean
  helperText?: string
  label?: string
}

interface StyleDatePickerProps extends BoxProps {
  error?: boolean
}
const StyleDatePicker = styled(Box)<StyleDatePickerProps>(({ theme, error }) => ({
  borderRadius: 8,
  backgroundColor: 'transparent !important',
  border: error ? `1px solid ${theme.palette.error.main}` : `1px solid rgba(${theme.palette.customColors.main}, 0.2)`,
  height: '38px',
  padding: '8px',
  position: 'relative',
  '.react-datepicker__header ': {
    backgroundColor: theme.palette.customColors.bodyBg,
    '.react-datepicker__day-name': {
      color: `rgba(${theme.palette.customColors.main}, 0.8)`
    },
    '.react-datepicker__current-month': {
      color: `rgba(${theme.palette.customColors.main}, 1)`
    }
  },
  '.react-datepicker-wrapper': {
    width: '100%',
    input: {
      border: 'none',
      outline: 'none',
      color: `rgba(${theme.palette.customColors.main}, 0.42)`,
      backgroundColor: 'transparent',
      width: '100%'
    }
  },
  '.react-datepicker__day--disabled': {
    backgroundColor: `${theme.palette.action.selected} !important`,
    borderRadius: '0.3rem'
  },
  '.react-datepicker-popper': {
    zIndex: '2 !important'
  },
  '.react-datepicker__day--keyboard-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.customColors.lightPaperBg
  },
  '.react-datepicker__month-container': {
    '.react-datepicker__month': {
      backgroundColor: `${theme.palette.background.paper} !important`,
      margin: 0,
      padding: '0.4rem',
      borderBottomLeftRadius: '4px',
      borderBottomRightRadius: '4px'
    },
    '.react-datepicker__day': {
      color: `rgba(${theme.palette.customColors.main}, 0.42)`,
      '&:hover': {
        backgroundColor: `rgba(${theme.palette.customColors.main}, 0.08)`
      },
      '&.react-datepicker__day--selected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.customColors.lightPaperBg
      }
    }
  },
  '.react-datepicker': {
    border: `1px solid rgba(${theme.palette.customColors.main}, 0.2)`
  },
  '.date-picker-icon': {
    position: 'absolute',
    right: '8px',
    top: '4px'
  }
}))
const CustomDatePicker = (props: TCustomDatePicker) => {
  const { selectedDate, onChange, placeholder, error, helperText, label, ...rests } = props
  const refDatePicker = useRef<any>(null)
  const theme = useTheme()
  const handleFocusCalendar = () => {
    if (refDatePicker.current) {
      refDatePicker.current?.setFocus()
    }
  }

  return (
    <Box>
      <InputLabel
        sx={{
          fontSize: '13px',
          marginBottom: '4px',
          display: 'block',
          color: error ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.68)`
        }}
      >
        {label}
      </InputLabel>
      <StyleDatePicker error={error}>
        <DatePicker
          placeholderText={placeholder}
          ref={refDatePicker}
          selected={selectedDate}
          onChange={onChange}
          {...rests}
        />
        <Icon icon='oui:token-date' className='date-picker-icon' fontSize={30} onClick={handleFocusCalendar} />
        {helperText && (
          <FormHelperText
            sx={{
              color: theme.palette.error.main,
              marginTop: '10px'
            }}
          >
            {helperText}
          </FormHelperText>
        )}
      </StyleDatePicker>
    </Box>
  )
}
export default CustomDatePicker
